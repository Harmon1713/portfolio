# Set the library path
.libPaths('C:/Users/jacki/AppData/Local/R/win-library/4.3')
# Set the working directory to a desired path
setwd("C:/Users/jacki/OneDrive/Desktop/Portfolio/website/examples")

library(ggplot2)
library(ggiraph)
library(patchwork)
library(dplyr)
library(htmlwidgets)

# Basic interactive ggiraph graph
p <- ggplot(mpg, aes(x=displ, 
                     y=hwy, 
                     color=class,
                     tooltip = manufacturer)) +
  geom_point_interactive()

g1 <- girafe(ggobj = p)

# Interactive ggiraph graph with customized tooltip
mpg <- mpg %>%
  mutate(tooltip = paste(manufacturer, model, class))

p <- ggplot(mpg, aes(x=displ, 
                     y=hwy, 
                     color=class,
                     tooltip = tooltip)) +
  geom_point_interactive()

g2 <- girafe(ggobj = p, options = list(opts_tooltip(use_fill = TRUE)))
htmlwidgets::saveWidget(g2, "interactive_graph1.html")

# Linked interactive graphs
p1 <- ggplot(mtcars, aes(x=wt, 
                         y=mpg, 
                         tooltip = rownames(mtcars),
                         data_id = rownames(mtcars))) +
  geom_point_interactive(size=3, alpha =.6) 

p2 <- ggplot(mtcars, aes(x=drat, 
                         y=qsec, 
                         tooltip = rownames(mtcars),
                         data_id = rownames(mtcars))) +
  geom_point_interactive(size = 3, alpha = .6) 

p3 <- ggplot(mtcars, aes(x=cyl,
                         data_id = rownames(mtcars))) +
  geom_bar_interactive() 

p3 <- (p1 | p2)/p3
g3 <- girafe(code = print (p3)) 
htmlwidgets::saveWidget(g3, "interactive_graph2.html")
