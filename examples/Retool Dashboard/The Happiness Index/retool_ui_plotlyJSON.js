// Data

[
  {
    "name": "normalized_gas_price",
    "x": {{Get_totalHappiness.data.period}},
    "y": {{Get_totalHappiness.data['normalized_gas_price']}},
    "type": "scatter",
    "mode": "lines+markers",
    "hovertemplate": "Gas Price: %{customdata}<extra></extra>",
    "customdata": {{Get_totalHappiness.data.gas_price}},
    "marker": {
      "color": "#1E3A8A"
    }
  },
  {
    "name": "normalized_cheese_price",
    "x": {{Get_totalHappiness.data.period}},
    "y": {{Get_totalHappiness.data['normalized_cheese_price']}},
    "type": "scatter",
    "mode": "lines+markers",
    "hovertemplate": "Cheese Price: %{customdata}<extra></extra>",
    "customdata": {{Get_totalHappiness.data.cheese_price}},
    "marker": {
      "color": "#FF0000"
    }
  },
  {
    "name": "temperature",
    "x": {{Get_totalHappiness.data.period}},
    "y": {{Get_totalHappiness.data.period.map(() => 1)}},
    "type": "bar",
    "hovertemplate": "Temperature: %{customdata}<extra></extra>",
    "customdata": {{Get_totalHappiness.data.temperature}},
    "marker": {
      "color": {{Get_totalHappiness.data.temperature.map(temp => temp > 90 ? "red" : temp > 80 ? "orange" : temp > 70 ? "yellow" : temp > 60 ? "green" : "blue")}},
      "opacity": 0.4
    }
  },
  {
    "name": "Happiest Day {{Get_Happiest.data.period[0]}}",
    "x": [{{Get_Happiest.data.period[0]}}],
    "y": [0.05],
    "type": "scatter",
    "mode": "markers",
    "marker": {
      "symbol": "star",
      "size": 15,
      "color": "#FFD700",
      "line": {
        "width": 2,
        "color": "black"
      }
    },
    "hoverinfo": "skip"
  },
  {
    "name": "happiness_rating",
    "x": {{Get_totalHappiness.data.period}},
    "y": {{Get_totalHappiness.data.period.map(() => 1.1)}},
    "type": "scatter",
    "mode": "markers",
    "marker": {
      "color": "rgba(0, 0, 0, 0)"
    },
    "hovertemplate": "<br>Happiness Rating: %{customdata}<extra></extra>",
    "customdata": {{Get_totalHappiness.data.total_happiness_score.map((score, index) => `${score}/${Get_totalHappiness.data.max_happiness_score[index]}`)}},
    "showlegend": false
  },
]


// Layout

{
  "title": {
    "text": "Happiness Index 2024",
    "font": {
      "color": "#3D3D3D",
      "size": 16
    }
  },
  "font": {
    "family": "var(--default-font, var(--sans-serif))",
    "color": "#979797"
  },
  "showlegend": true,
  "legend": {
    "xanchor": "center",
    "x": 0.45,
    "y": -0.2,
    "orientation": "h"
  },
  "margin": {
    "l": 72,
    "r": 24,
    "t": 80,
    "b": 32,
    "pad": 2
  },
  "hovermode": "x unified",
  "hoverlabel": {
    "bgcolor": "#000",
    "bordercolor": "#000",
    "font": {
      "color": "#fff",
      "family": "var(--default-font, var(--sans-serif))",
      "size": 12
    }
  },
  "clickmode": "select+event",
  "dragmode": "select",
  "xaxis": {
    "title": {
      "text": "Date",
      "standoff": 6,
      "font": {
        "size": 12
      }
    },
    "type": "-",
    "tickformat": "",
    "automargin": true,
    "fixedrange": true,
    "gridcolor": "#fff",
    "zerolinecolor": "#fff"
  },
  "yaxis": {
    "title": {
      "text": "Normalized Prices ($USD)",
      "standoff": 6,
      "font": {
        "size": 12
      }
    },
    "type": "linear",
    "tickformat": "",
    "automargin": true,
    "fixedrange": true,
    "zerolinecolor": "#DEDEDE"
  }
}

