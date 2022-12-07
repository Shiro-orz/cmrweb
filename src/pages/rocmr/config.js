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
    series: []
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

const colors = {
    dcmh: '#5470c6',
    dcmh_v: '#91cc75',
    dcmh_t: '#fac858',
    dcmh_vt: '#ee6666'
}

const tasks = ['it', 'ti', 'tt', 'ii']
// const samples = ['norm', 'adv']
const titles = {
    it: 'Image to Text',
    ti: 'Text to Image',
    ii: 'Image to Image',
    tt: 'Text to Text'
}

function SetSerie(modelname, data, linestyle) {
    let serie = JSON.parse(JSON.stringify(DefaultSerie)) 
    serie.name = modelname
    serie.color = colors[modelname]
    serie.data = data
    serie.lineStyle.type = linestyle
    return serie
}

function SetSingleOption(models, task, datas){
    let option = JSON.parse(JSON.stringify(DefaultOption))
    option.title.text = titles[task] 
    option.legend = models
    var series = []
    var i
    for (i = 0; i < models.length; i++){
        let norm_line = SetSerie(models[i], datas[task]['norm'][models[i]], 'solid')
        //let adv_line = SetSerie(models[i], datas[task]['adv'][models[i]], 'dashed')
        series.push(norm_line)
        //series.push(adv_line)
    }
    option.series = series
    return option 
}

function SetOption(models,datas){
    var options = {}
    var i
    for (i = 0; i < tasks.length; i++){
        //console.log(titles[tasks[i]])
        options[tasks[i]] = SetSingleOption(models, tasks[i], datas)
    }
    return options 
}

export {SetOption, DefaultOption}