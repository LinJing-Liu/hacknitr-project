# Flask application to work with js variable in python
from matplotlib import pyplot as plt
import pandas as pd
import seaborn as sns
import numpy as np
import json
from flask import request
from flask import Flask, render_template
app = Flask(__name__)

# html router


@app.route('/')
def index():
    return render_template('index.html')

# Import statements


# Getting data
productive_timer_data = 50  # change_variable
un_productive_timer_data = 50  # change_Variable
my_data = [productive_timer_data, un_productive_timer_data]
my_labels = ['productive', 'unproductive']

# Making the plot
plt.pie(my_data, labels=my_labels, autopct='%1.1f%%')
plt.title('Your time spent')
plt.axis('equal')
plt.show()

# making chart with data about different sites
