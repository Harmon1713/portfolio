library(ggplot2)
library(dplyr)
library(Ecdat)
library(RColorBrewer)

head(Cigarette)
cig = data.frame(Cigarette)

#Create boxplot of the average number of packs per capita by state
state_packs_boxplot <- ggplot(cig, aes(x=state, y=packpc, col = state)) 
state_packs_boxplot + geom_boxplot() + 
  ggtitle("Average Packs of Cigarettes Bought per State") + 
  theme(plot.title=element_text(hjust=0.5)) + ylab("Number of packs")
  
#Which states have the highest number of packs?
Cigarette %>%
  group_by(state) %>%
  summarise(mean = mean(packpc, na.rm=TRUE)) %>% arrange(desc(mean)) 
#put from smallest to largest #remove na from results

#Which states have the lowest number of packs?
Cigarette %>%
  group_by(state) %>%
  summarise(mean = mean(packpc, na.rm=TRUE)) %>% arrange(mean) 
#put from largest to smallest #remove na from results

#Find the median over all the states of the number of packs per capita for each year. 
median_packs_pyear <- Cigarette %>%
  group_by(year) %>%
  summarise(median = median(packpc, na.rm=TRUE))
View(median_packs_pyear)

#Plot this median value for the years from 1985 to 1995.
ggplot(median_packs_pyear, aes(x = year, y = median)) + 
  geom_line() + geom_point(aes(size = median, color = "red")) +
  ggtitle("Packs Bought per Capita (1985-1995)") + theme(plot.title=element_text(hjust=0.5)) +
  ylab("Median Number for all States") 

#Create a scatter plot of price per pack vs number of packs per capita for all states and years.  
ggplot(Cigarette, aes(packpc, avgprs)) + 
  geom_point(color = "dark green") + geom_smooth(method = lm, color = "green") +
  ggtitle("Price per Pack vs Number of Packs per Capita (all states)") +
  theme(plot.title=element_text(hjust=0.5)) +
  ylab("Average Price per Pack (cents)") + xlab("Number of Packs per Capita")

#Are the price and the per capita packs positively correlated, negatively correlated, or uncorrelated?
cor.test(Cigarette$avgprs, Cigarette$packpc, method="pearson")

#Change your scatter plot to show the points for each year in a different color.
ggplot(Cigarette, aes(packpc, avgprs, color = year)) + 
  geom_point() + geom_smooth(method = lm) +
  ggtitle("Price per Pack vs Number of Packs per Capita (all states)") +
  theme(plot.title=element_text(hjust=0.5)) +
  ylab("Average Price per Pack (cents)") + xlab("Number of Packs per Capita") +
  scale_fill_continuous(high = "1995", low = "1985")

#Do a linear regression for these two variables.
linear_regression <- (lm(avgprs ~  packpc, data  = Cigarette))
summary(linear_regression)

#The plot above does not adjust for inflation.You can adjust the price of a pack of 
#cigarettes for inflation by dividing the avgprs variable by the cpi variable.
#Create an adjusted price for each row, then re-do your scatter plot and 
#linear regression using this adjusted price.

Cigarette$adj_price <- Cigarette$avgprs / Cigarette$cpi

ggplot(Cigarette, aes(packpc, adj_price, color = year)) + 
  geom_point() + geom_smooth(method = lm) +
  ggtitle("Adjusted Price per Pack vs Number of Packs per Capita (all states)") +
  theme(plot.title=element_text(hjust=0.5)) +
  ylab("Adjusted Average Price per Pack (cents)") + xlab("Number of Packs per Capita") +
  scale_fill_continuous(high = "1995", low = "1985")

adj_linear_regression <- (lm(adj_price ~  packpc, data  = Cigarette))
summary(adj_linear_regression)

#Create a data frame with just the rows from 1985. 
#Create a second data frame with just the rows from 1995. 
#Then, from each of these data frames, get a vector of the number of packs per capita. 
#Use a paired t-test to see if the number of packs per capita in 1995 
#was significantly different than the number of packs per capita in 1985.

#Create a data frame with just the rows from 1985.
C1985 <- Cigarette %>% filter(year == 1985)

#Create a second data frame with just the rows from 1995. 
C1995 <- Cigarette %>% filter(year == 1995)

#Paired t-test
t.test(C1985$packpc, C1995$packpc, paired = TRUE)

#Questions that can be answered by the data
head(Cigarette)
#plot income and number of packs of cigarettes
ggplot(Cigarette, aes(income, packpc)) + geom_point() + 
  geom_smooth(method = lm) + 
  ggtitle("Income vs Number of Packs per Capita") +
  theme(plot.title=element_text(hjust=0.5)) +
  ylab("Number of Packs per Capita") + xlab("Total State Personal Income")
#correlation
cor.test(Cigarette$income, Cigarette$packpc, method="pearson")