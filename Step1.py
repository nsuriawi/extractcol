# -*- coding: utf-8 -*-
"""
Created on Mon Jun 26 11:34:23 2017

@author: Nathaniel
"""
import numpy as np
from scipy import misc
import matplotlib.pyplot as plt
from scipy import ndimage
from PIL import Image


#t = misc.imread('test2seg.png')
#type(t)
#t.shape, t.dtype

img = Image.open('test2slider.png')
colors = img.getcolors(10 * 100)
print(colors)

