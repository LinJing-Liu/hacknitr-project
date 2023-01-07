# Import statements 
import numpy as np
import seaborn as sns
import pandas as pd
import matplotlib.pyplot as plt
import sklearn
import seaborn
from matplotlib import pyplot as plt

# Getting data 
productive_timer_data = 50 #change_variable 
un_productive_timer_data = 50  #change_Variable 
my_data = [productive_timer_data, un_productive_timer_data]
my_labels = ['productive', 'unproductive']

#Making the plot 
plt.pie(my_data, labels=my_labels, autopct='%1.1f%%')
plt.title('Your time spent')
plt.axis('equal')
plt.show()


