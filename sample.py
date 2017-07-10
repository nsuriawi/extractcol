# -*- coding: utf-8 -*-
"""
Created on Tue Jun 27 13:16:49 2017

@author: Nathaniel
"""

import matplotlib.pyplot as plt
import numpy as np
column_labels = list('ABCD')
row_labels = list('WXYZ')
data = np.random.rand(4, 4)
fig, ax = plt.subplots()
heatmap = ax.pcolor(data, cmap=plt.cm.Blues)

# put the major ticks at the middle of each cell
ax.set_xticks(np.arange(data.shape[1]) + 0.5, minor=False)
ax.set_yticks(np.arange(data.shape[0]) + 0.5, minor=False)

# want a more natural, table-like display
ax.invert_yaxis()
ax.xaxis.tick_top()

ax.set_xticklabels(column_labels, minor=False)
ax.set_yticklabels(row_labels, minor=False)
plt.show()
