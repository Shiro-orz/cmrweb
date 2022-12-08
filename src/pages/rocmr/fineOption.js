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
    rocmr: '#ee6666',
    rocmr_v: '#91cc75',
    rocmr_t: '#fac858',
    rocmr_vt: '#ee6666',
    finetune: '#91cc75',
    dis: '',
}


// const dicts = {
//     rocmr: '*rocmr',
//     rocmr_v: '*rocmr_v',
//     rocmr_t: '*rocmr_t',
//     rocmr_vt: '*rocmr_vt',
// }

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
    serie.color = color
    serie.data = data
    serie.lineStyle.type = linestyle
    return serie
}

function SetSingleOption(task, datas, page){
    let option = JSON.parse(JSON.stringify(DefaultOption))
    var legend = []
    option.title.text = titles[task]
    //option.legend.data = models 
    var series = []
    var name 
    var lineStyle 
    var color
    for (var datatype in datas){
        for (var modelname in datas[datatype]){
            if (datatype == 'norm'){
                name = modelname
            }
            else{
                name = '*'+modelname
            }
            if (page == 'dcmh'){
                color = colors[modelname]
            }
            else {
                if (modelname.includes('dcmh')){
                    color = colors['dcmh']
                }
                else if (modelname.includes('rocmr')){
                    color = colors['rocmr']
                }
                else if (modelname.includes('Finetune')){
                    color = colors['finetune']
                }
                else if (modelname.includes('dis')){
                    color = colors['dis']
                }
            }
            if (datatype == 'norm') {
                lineStyle = 'solid'
            }
            else {
                lineStyle = 'dashed'
            }
            var line = SetSerie(name, datas[datatype][modelname], lineStyle, color)
            series.push(line)
            legend.push(name)
        }
    }
    option.legend.data = legend
    option.series = series
    return option 
}

function SetOption(datas, page){
    var options = {}
    for (let task of tasks){
        //console.log(task)
        options[task] = SetSingleOption(task, datas[task], page)
    }
    return options 
}

export {SetOption, DefaultOption, tasks}