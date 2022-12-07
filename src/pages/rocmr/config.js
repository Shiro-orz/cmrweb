var DefaultOption = {
    title: {
      text: '',
      top: 0
    },
    tooltip: {
      trigger: 'axis'
    },
    legend: {
      data: [],
      top: 24,
      symbol: 'none',
    },
    grid: {
      top: '20%',
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

const dicts = {
    dcmh: 'a_dcmh',
    dcmh_v: 'a_dcmh_v',
    dcmh_t: 'a_dcmh_t',
    dcmh_vt: 'a_dcmh_vt'
}

const tasks = ['it', 'ti', 'tt', 'ii']
// const samples = ['norm', 'adv']
const titles = {
    it: 'Image to Text',
    ti: 'Text to Image',
    ii: 'Image to Image',
    tt: 'Text to Text'
}

function SetSerie(modelname, data, linestyle, color) {
    let serie = JSON.parse(JSON.stringify(DefaultSerie)) 
    serie.name = modelname
    serie.color = colors[color]
    serie.data = data
    serie.lineStyle.type = linestyle
    return serie
}

function SetSingleOption(models, task, datas){
    let option = JSON.parse(JSON.stringify(DefaultOption))
    let ms = JSON.parse(JSON.stringify(models))
    option.title.text = titles[task]
    //option.legend.data = models 
    var series = []
    var i
    for (i = 0; i < models.length; i++){
        let norm_line = SetSerie(models[i], datas[task]['norm'][models[i]], 'solid', models[i])
        series.push(norm_line)
        ms.push(dicts[models[i]])
        let adv_line = SetSerie(dicts[models[i]], datas[task]['adv'][models[i]], 'dashed', models[i])
        series.push(adv_line)
    }
    option.legend.data = ms
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

export {SetOption, DefaultOption, tasks}