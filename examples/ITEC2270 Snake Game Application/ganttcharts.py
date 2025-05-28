import matplotlib.pyplot as plt
import matplotlib.patches as mpatches

# Define the tasks and their respective time frames for each timeline
tasks = [
    "Entry Quiz", "Project Outline", "DA 1", "Review and Debugging DA1", "DA 2", 
    "Review and Debugging DA2", "DA 3", "Review and Debugging DA3", 
    "DA 4", "DA 4 (Future)", "Review and Debugging DA4", "Draft of Final", "Final Project", "Review Others’ Games", 
    "Reflective Assignment", "Contingency Week"
]

original_timeline = {
    "Entry Quiz": (1, 1), "Project Outline": (0, 0), "DA 1": (2, 2), "Review and Debugging DA1": (3, 3), 
    "DA 2": (4, 5), "Review and Debugging DA2": (6, 6), "DA 3": (7, 8), 
    "Review and Debugging DA3": (9, 9), "DA 4": (10, 12), "DA 4 (Future)": (0, 0),
    "Review and Debugging DA4": (13, 13),  "Draft of Final": (0, 0), "Final Project": (14, 14), 
    "Review Others’ Games": (15, 15), "Reflective Assignment": (16, 16), 
    "Contingency Week": (17, 17)
}

adjusted_timeline = {
    "Entry Quiz": (1, 1), "DA 1": (2, 2), "Review and Debugging DA1": (3, 3), 
    "DA 2": (4, 5), "Review and Debugging DA2": (6, 6), "Project Outline": (7, 7), 
    "DA 3": (8, 9), "Review and Debugging DA3": (10, 10), "DA 4": (11, 13), "DA 4 (Future)": (0, 0),
    "Review and Debugging DA4": (14, 14),  "Draft of Final": (0, 0), "Final Project": (15, 15), 
    "Review Others’ Games": (16, 16), "Reflective Assignment": (17, 17)
}

future_timeline = {
    "Entry Quiz": (1, 1), "Project Outline": (2, 2), "DA 1": (2, 2),
    "Review and Debugging DA1": (3, 3), "DA 2": (4, 5), 
    "Review and Debugging DA2": (6, 6), "DA 3": (7, 8), 
    "Review and Debugging DA3": (9, 9), "DA 4 (Future)": (10, 13), 
    "Review and Debugging DA4": (14, 14), "Draft of Final": (15, 15), 
    "Review Others’ Games": (15, 15), "Final Project": (16, 16), 
    "Reflective Assignment": (16, 16), "Contingency Week": (17, 17)
}

# Create the figure and axis
fig, ax = plt.subplots(figsize=(15, 10))

# Define colors for the bars with transparency
colors = {
    'Original': 'yellow', 'Adjusted': 'red', 'Future': 'blue',
    'Original-Future': 'green', 'Original-Adjusted': 'orange',
    'Future-Adjusted': 'purple', 'All': 'grey'
}
alpha_value = 0.8  # Set the transparency level

# Function to add bars to the chart
def add_bars(timeline, color_key, shift=0):
    for task, (start, end) in timeline.items():
        ax.barh(task, end-start+1, left=start, color=colors[color_key], edgecolor='black', alpha=alpha_value)

# Add the original timeline bars
add_bars(original_timeline, 'Original')

# Overlay adjusted timeline bars
for task, (start, end) in adjusted_timeline.items():
    if task in original_timeline and original_timeline[task] == (start, end):
        add_bars({task: (start, end)}, 'Original-Adjusted')
    else:
        ax.barh(task, end-start+1, left=start, color=colors['Adjusted'], edgecolor='black', alpha=alpha_value)

# Overlay future timeline bars
for task, (start, end) in future_timeline.items():
    if task in original_timeline and task in adjusted_timeline:
        if original_timeline[task] == (start, end) and adjusted_timeline[task] == (start, end):
            add_bars({task: (start, end)}, 'All')
        elif original_timeline[task] == (start, end):
            add_bars({task: (start, end)}, 'Original-Future')
        elif adjusted_timeline[task] == (start, end):
            add_bars({task: (start, end)}, 'Future-Adjusted')
    elif task in original_timeline and original_timeline[task] == (start, end):
        add_bars({task: (start, end)}, 'Original-Future')
    elif task in adjusted_timeline and adjusted_timeline[task] == (start, end):
        add_bars({task: (start, end)}, 'Future-Adjusted')
    else:
        add_bars({task: (start, end)}, 'Future')

# Add the extra space for Project Outline for the future timeline
ax.barh("Project Outline", future_timeline["Project Outline"][1] - future_timeline["Project Outline"][0] + 1, left=future_timeline["Project Outline"][0], color=colors["Future"], edgecolor="black", alpha=alpha_value)
# Add the extra space for DA 4 for the future timeline
ax.barh("DA 4 (Future)", future_timeline["DA 4 (Future)"][1] - future_timeline["DA 4 (Future)"][0] + 1, left=future_timeline["DA 4 (Future)"][0], color=colors["Future"], edgecolor="black", alpha=alpha_value)
# Add the extra space for Draft of Final for the future timeline
ax.barh("Draft of Final", future_timeline["Draft of Final"][1] - future_timeline["Draft of Final"][0] + 1, left=future_timeline["Draft of Final"][0], color=colors["Future"], edgecolor="black", alpha=alpha_value)


# Set the labels, limits, and title
ax.set_xlabel('Weeks')
ax.set_xlim(1, 18)
ax.set_ylabel('Tasks')
ax.set_yticks(range(len(tasks)))
ax.set_yticklabels(tasks)
ax.set_title('Project Timelines Gantt Chart')

# Create custom legends
legend_patches = [
    mpatches.Patch(color='yellow', label='Original Timeline', alpha=alpha_value),
    mpatches.Patch(color='red', label='Adjusted Timeline', alpha=alpha_value),
    mpatches.Patch(color='blue', label='Future Timeline', alpha=alpha_value),
    mpatches.Patch(color='green', label='Original and Future Overlap', alpha=alpha_value),
    mpatches.Patch(color='orange', label='Original and Adjusted Overlap', alpha=alpha_value),
    mpatches.Patch(color='purple', label='Future and Adjusted Overlap', alpha=alpha_value),
    mpatches.Patch(color='grey', label='All Timelines Overlap', alpha=alpha_value)
]
ax.legend(handles=legend_patches, loc='lower right')

# Save the plot as an image
plt.tight_layout()
plt.savefig('project_timelines_gantt_chart.png')

# Show the plot
plt.show()
