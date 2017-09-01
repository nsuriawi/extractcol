Host local server and select colorExtractor.html

Select the bar area with your mouse
A prompt should appear and ask you what domain you would like to define
Fill those in and hit the 'x' or 'esc' or click out of the box
Clicking anywhere on the canvas should return the nearest value in the top right, the display is binded to the the window box not canvas.

As of now, the only way to reselect bars is to refresh the page



Relevant files:
  colorExtractor.html
  histor.js
  nearesColor.js
  picoModal-3.0.0.min.js



Sources and help:
  http://stackoverflow.com/questions/6735470/get-pixel-color-from-canvas-on-mouseover
  http://bl.ocks.org/jinroh/4666920
  https://github.com/dtao/nearest-color
  https://github.com/Nycto/PicoModal




PLANS


Bug report:

Vertical bar reading is printing out an error, looks like it is reaching the end of the array before finishing printing RB values in sample. [ ]

colorscaling is not working properly, it looks like the modalClose function must be used before to update the domain, it is not updating properly. [x] Done.


As of now:
- Bar can be selected with brush and clicking anywhere in the canvas will allow numerical defined values as long as the bar has a linear progression.
- The algorithm for sorting the bar runs at: O(n) 

	* The algo creates a one dimensional array from the selected area to make parsing data faster

-Matching colors between the bar and selected values from "click" -ing are found using the nearestColor.js

Moving Forward:

- Upon second time selection with brush, let users select whole area, specify size and shape of boxes, and create a downloadable 2-D array.
- Allow for logarithmic progression on the bar as well
- Create a more user-friendly UI for uploading files.
- If the time complexity proves to be a larger problem, look to improving this. 
