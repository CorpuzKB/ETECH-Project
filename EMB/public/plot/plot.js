async function plot_Predictions(X_predict, X, y, y_UpperCI, y_LowerCI, y_mean, sensor, date_0="2022-12-18 16:30"){
  let label = (sensor == 'Temperature')? '°C': '%';
  const points = -4;
  X = X.slice(points);
  y = y.slice(points);
  X = feature_to_date(X, date_0);
  X_predict = feature_to_date(X_predict, date_0);
  let plot_train = {
        x: X,
        y: y,
        hovertemplate: '%{y:.2f}' + label + '<extra></extra>',
        mode: 'lines+markers',
        type: 'scatter',
        name: "Observations",
        line: {
          color: "rgb(0,0,0)",
          shape: 'spline',
          size: 3,  
        },
        marker: { 
          size: 10,
          color: 'rgb(219, 64, 82)'
  }};
  let plot_predict = {
        x: X_predict,
        y: y_mean,
        hovertemplate: '%{y:.2f}' + label + '<extra></extra>',
        mode: 'lines+markers',
        type: 'scatter',
        name: "Forecast",
        line: {
            color: "rgb(0,0,0)",
            shape: 'spline',
            size: 3,  
          },
          marker: { 
            size: 6,
            color: 'rgb(25,135,84)'},
        xaxis: 'x2',
        yaxis: 'y2',};
  let CI = {
        x: X_predict.concat(X_predict.slice().reverse()), 
        y: y_LowerCI.concat(y_UpperCI.slice().reverse()),
        fill: 'toself',
        fillcolor: "rgba(25,135,84,0.16)", 
        type: 'scatter',
        line: {color: "transparent"}, 
        name: "Uncertainty",
        xaxis: 'x2',
        yaxis: 'y2',
  };
  let data = [plot_train, CI, plot_predict];
  let config = {responsive: true}
  let layout = {
    grid: {rows: 1, columns: 2},
    yaxis2: {anchor: 'x2'},
    xaxis2: {domain: [0.26, 1]},
    font: {
      family: "Montserrat",
    },
        title: {
            text: sensor + ' Forecast',
            font: {
              family: "Montserrat",
              color: '#198754',
              size: 29
            },
            xref: 'paper',
            x: 0.05,
        },
        xaxis: {
          domain: [0, 0.2],
          font: {
            family: "Montserrat",
          },
            title: {
              font: {
                family: "Montserrat",
                size: 22,
                color: '#198754'
              }
            },
          },
          yaxis: {
            ticks:{
              font: {
                family: "Montserrat",
              },
            },
            title: {
              text: label,
              font: {
                family: "Montserrat",
                size: 22,
                color: '#198754'
              }
            }
          },
  };
  await Plotly.newPlot('chart-'+ sensor, data, layout, config);
}

function feature_to_date(feature, date_0){
  let date = [];
  for (const item of feature){
    let date_T =  new Date(date_0);
    date_T.setMinutes(date_T.getMinutes() + Number(item));
    let min = String(date_T.getMinutes());
    if (min < 10){
      min = "0" + min;  
    }
    date.push(String(date_T.getFullYear() + "-" + String(date_T.getMonth() + 1) +  "-"
                     + date_T.getDate() + " " + date_T.getHours() + ":" + min));
  }
  return date
}