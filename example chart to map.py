# -*- coding: utf-8 -*-
"""
Created on Tue Jun 27 12:07:33 2017

@author: Nathaniel
"""

import numpy as np
import numpy.random
import matplotlib.pyplot as plt

a = np.random.random((6, 6))




#a = np.array([],[])
x= [0,1,2,3,4,5]
y= [0,1,2,3,4,5]
amino = ['W', 'F', 'Y', 'L', 'I','M']
somechemical = ['A', 'B', 'C', 'D', 'E', 'F']

# Plot heatmap
plt.clf()
#plt.set_xlabel('Some Chemical')
plt.yticks(y, amino)
plt.xticks(x, somechemical)
#plt.xaxis.tick_top()

#plt.set_clim(vmin=0, vmax=15)
plt.imshow(a, cmap='bwr', interpolation='nearest')
plt.show()