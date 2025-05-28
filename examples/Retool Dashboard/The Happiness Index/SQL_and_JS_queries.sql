-- SQL Query: GasPrices

CREATE TABLE if not exists Combined_Gas_Prices AS
SELECT *
FROM (
    SELECT *
    FROM gas_prices
    UNION
    SELECT *
    FROM gas_prices2
) AS combined
ORDER BY period ASC;

SELECT COUNT(*) AS row_count
FROM combined_gas_prices;

SELECT MIN(period) AS earliest_date, MAX(period) AS latest_date
FROM combined_gas_prices;

CREATE TABLE if not exists Georgia_RegularGas_Prices AS
SELECT *
FROM Combined_Gas_Prices
WHERE duoarea = 'R1Z'
AND product = 'EPMR';

SELECT COUNT(*) AS row_count
FROM Georgia_RegularGas_Prices;

SELECT MIN(period) AS earliest_date, MAX(period) AS latest_date
FROM Georgia_RegularGas_Prices;


-- SQL Query: GAGasPrices

CREATE TABLE if not exists Georgia_RegularGas_Prices AS
SELECT *
FROM Combined_Gas_Prices
WHERE duoarea = 'R1Z'
AND product = 'EPMR';

SELECT COUNT(*) AS row_count
FROM Georgia_RegularGas_Prices;

SELECT MIN(period) AS earliest_date, MAX(period) AS latest_date
FROM Georgia_RegularGas_Prices;


-- SQL Query: GetGAgasPrices

SELECT period, value FROM Georgia_RegularGas_Prices;


-- SQL Query: Temp

CREATE TABLE IF NOT EXISTS Georgia_RealFeelTemperatures_Updated AS
SELECT datetime AS period, feelslike
FROM georgia_real_feel_temperatures;


-- SQL Query: GetTemp

SELECT * FROM Georgia_RealFeelTemperatures_Updated;


-- SQL Query: TempwithGAGasPrices

CREATE TABLE IF NOT EXISTS Gas_Prices_With_Temperature AS
WITH Filled_Gas_Prices AS (
    SELECT 
        temp.period,
        COALESCE(gp.value, (
            SELECT gp2.value
            FROM Georgia_RegularGas_Prices gp2
            WHERE gp2.period <= temp.period
            ORDER BY gp2.period DESC
            LIMIT 1
        )) AS value
    FROM 
        Georgia_RealFeelTemperatures_Updated temp
    LEFT JOIN 
        Georgia_RegularGas_Prices gp
    ON 
        temp.period = gp.period
)
SELECT 
    filled.period, 
    filled.value, 
    temp.feelslike
FROM 
    Filled_Gas_Prices filled
JOIN 
    Georgia_RealFeelTemperatures_Updated temp
ON 
    filled.period = temp.period
ORDER BY 
    temp.period ASC;


-- SQL Query: Get_TempwGasPrices

SELECT * FROM Gas_Prices_With_Temperature;


-- SQL Query: CheesePrices

CREATE TABLE IF NOT EXISTS Cheese_Prices_Updated AS
SELECT 
    date AS period, 
    APU_0000710212 AS value
FROM 
    Cheese_Prices
WHERE 
    date >= '2024-01-01';


-- SQL Query: Get_CheesePrices

SELECT * FROM Cheese_Prices_updated;


-- SQL Query: Gas_Temp_Cheese

CREATE TABLE IF NOT EXISTS Filled_Cheese_Prices AS
WITH All_Dates AS (
    SELECT DISTINCT period FROM Gas_Prices_With_Temperature
),
Filled_Cheese AS (
    SELECT 
        ad.period,
        COALESCE(cp.value, (
            SELECT cp2.value
            FROM Cheese_Prices_Updated cp2
            WHERE cp2.period <= ad.period
            ORDER BY cp2.period DESC
            LIMIT 1
        )) AS value
    FROM 
        All_Dates ad
    LEFT JOIN 
        Cheese_Prices_Updated cp
    ON 
        ad.period = cp.period
)
SELECT 
    period, 
    value
FROM 
    Filled_Cheese
ORDER BY 
    period ASC;

CREATE TABLE IF NOT EXISTS Gas_Temp_Cheese AS
SELECT 
    gt.period,
    gt.value AS gas_price,
    gt.feelslike,
    fc.value AS cheese_price
FROM 
    Gas_Prices_With_Temperature gt
LEFT JOIN 
    Filled_Cheese_Prices fc
ON 
    gt.period = fc.period
ORDER BY 
    gt.period ASC;


-- SQL Query: Get_Gas_Temp_Cheese

SELECT * from gas_temp_cheese;


-- SQL Query: Normalized_Gas_Cheese_temp

CREATE TABLE IF NOT EXISTS Gas_Temp_Cheese_Normalized AS
SELECT 
    period,
    gas_price,
    (gas_price - MIN(gas_price) OVER ()) / (MAX(gas_price) OVER () - MIN(gas_price) OVER ()) AS normalized_gas_price,
    cheese_price,
    (cheese_price - MIN(cheese_price) OVER ()) / (MAX(cheese_price) OVER () - MIN(cheese_price) OVER ()) AS normalized_cheese_price,
    feelslike
FROM 
    Gas_Temp_Cheese;


-- SQL Query: Get_normalized

select * from gas_temp_cheese_normalized;


-- SQL Query: Ranking

CREATE TABLE IF NOT EXISTS happiness_ranking AS
WITH RankedData AS (
    SELECT 
        period,
        gas_price,
        cheese_price,
        feelslike,
        -- Rank gas prices (higher is better for lower prices)
        RANK() OVER (ORDER BY gas_price DESC) AS gas_rank,
        -- Rank cheese prices (higher is better for lower prices)
        RANK() OVER (ORDER BY cheese_price DESC) AS cheese_rank,
        -- Rank temperatures (higher is better for higher temperatures)
        RANK() OVER (ORDER BY feelslike ASC) AS temp_rank,
        -- Calculate total happiness score (sum of ranks)
        (RANK() OVER (ORDER BY gas_price DESC) + 
         RANK() OVER (ORDER BY cheese_price DESC) + 
         RANK() OVER (ORDER BY feelslike ASC)) AS total_happiness_score
    FROM 
        gas_temp_cheese_normalized
)
SELECT 
    period,
    gas_price,
    gas_rank,
    cheese_price,
    cheese_rank,
    feelslike AS temperature,
    temp_rank,
    total_happiness_score
FROM 
    RankedData
ORDER BY 
    total_happiness_score DESC;  -- Higher total score means better "happiness"


-- SQL Query: GetRanking

SELECT * from happiness_ranking;


-- SQL Query: Happiest

CREATE TABLE IF NOT EXISTS Top_Happiest_Days AS
SELECT *
FROM happiness_ranking
ORDER BY total_happiness_score DESC
LIMIT 3;


-- SQL Query: Get_Happiest

SELECT * from top_happiest_days;


-- SQL Query: totalHappiness

CREATE TABLE IF NOT EXISTS total_happiness AS
SELECT 
    gtc.period,
    gtc.gas_price AS Gas_Price,
    gtc.normalized_gas_price AS Normalized_Gas_Price,
    hr.gas_rank AS Gas_Rank,
    gtc.cheese_price AS Cheese_Price,
    gtc.normalized_cheese_price AS Normalized_Cheese_Price,
    hr.cheese_rank AS Cheese_Rank,
    gtc.feelslike AS Temperature,
    hr.temp_rank AS Temperature_Rank,
    hr.total_happiness_score AS Total_Happiness_Score,
    MAX(hr.total_happiness_score) OVER () AS Max_Happiness_Score
FROM 
    gas_temp_cheese_normalized gtc
LEFT JOIN 
    happiness_ranking hr
ON 
    gtc.period = hr.period
ORDER BY 
    gtc.period ASC;


-- SQL Query: Get_totalHappiness

SELECT * from total_happiness;
SELECT MAX(total_happiness_score) AS happiest_score
FROM total_happiness;

SELECT 
    period as happiest_day
FROM 
    total_happiness
WHERE 
    total_happiness_score = (
        SELECT MAX(total_happiness_score) 
        FROM total_happiness
    );


-- JS Query: ExportCSV

function exportTotalHappinessCSV() {
  Get_totalHappiness.trigger({
    onSuccess: () => {
      const data = Get_totalHappiness.data;
      const fileName = 'total_happiness';
      const fileType = 'csv';

      if (data) {
        utils.exportData(data, fileName, fileType);
      } else {
        console.error("No data available to export.");
      }
    },
    onFailure: () => {
      console.error("Failed to retrieve total happiness data.");
    },
    additionalScope: {},
  });
}

// Trigger the export function
exportTotalHappinessCSV();
