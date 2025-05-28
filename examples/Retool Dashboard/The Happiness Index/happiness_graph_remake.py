import plotly.graph_objects as go
import pandas as pd

# Load your data from the CSV
df = pd.read_csv('total_happiness.csv')

# Identify the happiest day
happiest_day = df.loc[df['total_happiness_score'].idxmax()]

# Find the maximum happiness score
max_happiness_score = df['total_happiness_score'].max()

# Create the plot
fig = go.Figure()

# Add Gas Prices Line
fig.add_trace(go.Scatter(
    x=df['period'], 
    y=df['normalized_gas_price'], 
    mode='lines+markers', 
    name='Normalized Gas Price',
    hovertemplate=[
        "<b>\u2605 Happiest Day</b><br>Gas Price: %{customdata[0]}<extra></extra>"
        if date == happiest_day['period'] else
        "Gas Price: %{customdata[0]}<extra></extra>"
        for date in df['period']
    ],
    customdata=df[['gas_price']].values,
    marker={'color': '#1E3A8A'}
))

# Add Cheese Prices Line
fig.add_trace(go.Scatter(
    x=df['period'], 
    y=df['normalized_cheese_price'], 
    mode='lines+markers', 
    name='Normalized Cheese Price',
    hovertemplate=[
        "<b>\u2605 Happiest Day</b><br>Cheese Price: %{customdata[0]}<extra></extra>"
        if date == happiest_day['period'] else
        "Cheese Price: %{customdata[0]}<extra></extra>"
        for date in df['period']
    ],
    customdata=df[['cheese_price']].values,
    marker={'color': '#FF0000'}
))

# Add Temperature as Background
fig.add_trace(go.Bar(
    x=df['period'], 
    y=[1] * len(df), 
    marker_color=df['temperature'].apply(
        lambda temp: 'red' if temp > 90 else 'orange' if temp > 80 else 'yellow' if temp > 70 else 'green' if temp > 60 else 'blue'
    ), 
    opacity=0.4, 
    name='Temperature',
    hovertemplate=[
        "<b>\u2605 Happiest Day</b><br>Temperature: %{customdata[0]}<extra></extra>"
        if date == happiest_day['period'] else
        "Temperature: %{customdata[0]}<extra></extra>"
        for date in df['period']
    ],
    customdata=df[['temperature', 'total_happiness_score']].values
))

# Add Happiness Rating as an Invisible Trace for Hover Information
fig.add_trace(go.Scatter(
    x=df['period'], 
    y=[1.05] * len(df),  # This ensures the trace is slightly above the temperature bars
    mode='markers',
    marker=dict(color='rgba(0,0,0,0)'),  # Invisible markers
    showlegend=False,  # Do not show this trace in the legend
    hoverinfo='none',  # Disable default hover info
    hovertemplate=[
        "<b>\u2605 Happiest Day</b><br>Happiness Rating: %{customdata[0]}/" + str(max_happiness_score) + "<extra></extra>"
        if date == happiest_day['period'] else
        "Happiness Rating: %{customdata[0]}/" + str(max_happiness_score) + "<extra></extra>"
        for date in df['period']
    ],
    customdata=df[['total_happiness_score']].values  # Only include happiness rating
))


# Add Star for the Happiest Day with a black outline
fig.add_trace(go.Scatter(
    x=[happiest_day['period']], 
    y=[0.05],  # Position the star just above the x-axis
    mode='markers', 
    marker=dict(
        symbol='star', 
        size=15, 
        color='#FFD700',
        line=dict(width=2, color='black')  # Black outline with 2px width
    ),
    name=f"Happiest Day ({happiest_day['period']})",
	hoverinfo='skip'  # Removes the hover tooltip for the star

))

# Update layout
fig.update_layout(
    title={
        'text': "Happiness Index 2024",
        'x':0.5,
        'xanchor': 'center',
    },
    yaxis=dict(range=[0, 1.05], fixedrange=True),  # Add a small buffer above the y-axis
    xaxis_title="Date",
    yaxis_title="Normalized Price Values ($USD)",
    hovermode="x unified",  # This ensures all values show up when hovering over any data point
    xaxis=dict(tickmode="auto", nticks=10),
    margin=dict(l=50, r=50, t=50, b=50)
)

# Save as HTML to view interactively
fig.write_html("interactive_graph_total_happiness.html")
