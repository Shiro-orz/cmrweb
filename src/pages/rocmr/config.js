var DefaultOption = {
    title: {
      text: ''
    },
    tooltip: {
      trigger: 'axis'
    },
    legend: {
      data: []
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true
    },
    // toolbox: {
    //   feature: {
    //     saveAsImage: {}
    //   }
    // },
    xAxis: {
      type: 'value'
    },
    yAxis: {
      type: 'value'
    },
    series: [
      {
        name: 'Email',
        type: 'line',
        lineStyle: {
          type: 'dashed'
        },
        symbol: 'none',
        data: [
          [90, 120],
          [200, 132],
          [10, 101]
        ]
      },
      
    ]
  };

var DefaultSerie = {
    name: '',
    type: 'line',
    lineStyle: {
        type: 'solid'
      },
    symbol: 'none',
    color: '#5470c6',
    data: []
}

const SetSerie(modelname, data){

}

const SetOption(models, curves){

}