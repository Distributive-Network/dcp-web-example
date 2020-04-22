/**
 * @file   index.js
 * @author Nazila Akhavan
 * @date   April 2020
 * 
 * Sample web application showing how to deploy a DCP job.
 */
const maxRange = 100000
const deployJob = async function () {
  let divPlot = document.getElementById('divPlot');
  let inputValue =  document.getElementById('slider').value;
  let computBtn = document.getElementById('compute-button');
  let cancelBtn = document.getElementById('cancel-button');
  let noResult = true;

  computBtn.style.backgroundColor = '#e4e4e4';
  computBtn.innerHTML = 'running';
  computBtn.disabled = true;
  cancelBtn.style.backgroundColor = '#3da664d9';
  inputValue = Number(inputValue);
  while(divPlot.firstChild){
      divPlot.removeChild(divPlot.firstChild);
  }
  console.log("Deploying job...");

  cancelBtn.onclick = async () => {
    job.cancel();
    computBtn.innerHTML = 'Compute';
    computBtn.style.backgroundColor = '#3da664d9';
    cancelBtn.style.backgroundColor = '#e4e4e4';
    document.getElementById('progress').style.width = '0%'
  }

  let job = dcp.compute.for(1, inputValue, async function(number){
    const isTriangle = function (number) {
      let sum = 0;
      progress(0);
      for( let i = 0; i < number; i++ ) {
        sum += i;
        if(sum === number) {
          if (isPerfect(number)) {
            return i;
          }
        } else if ( sum > number) {
          return false;
        } 
      }
    };
    
    const isPerfect = function (value) {
      let sum = 0;
      for (let i = 1; i < value; i++) {
        if (value % i === 0) {
          progress(i / (value - 1));
          sum += i;
          if (sum > value) {
            return false;
          } 
        }
      }
      if (sum === value) {
        return true;
      }
      return false; 
    };

    let triangle = isTriangle(number);
    if (triangle) {
      let perfect = isPerfect(number);
      if (perfect) return [number, triangle];
    }
    return false;
  });

  const plot2D = function (n, index) {
    let x = Array.from(new Array(index),(val,index) => index + 1);
    let y = new Array(index).fill(0);
    let x0 = x, y0 = y;
    for (let i = 0; i < index - 1; i++) {
      let x1 = [];
      for (let k = 0; k < x0.length - 1; k++) {
        x1.push((x0[k] + x0[k + 1]) / 2)
      }
      x0 = x1;
      y0 = new Array(x0.length).fill(i + 1); 
      x = x.concat(x0);
      y = y.concat(y0);
    }
   
    var trace1 = {
      x: x,
      y: y,
      mode: 'markers',
      type: 'scatter',
      marker: {
         size: 12,
         color: '#f0204d'
      },
    };
    
    var data = [ trace1 ];
    
    var layout = {
      autosize: false,
      title:`Perfect triangle number = ${n}`
    };
    
    Plotly.newPlot(`plot-${n}`, data, layout);
  }

  job.contextId = 'webExemplar'
  job.public.name = 'dcp-web-exemplar'  
  job.work.on('uncaughtException', (e) => console.error(e));

  job.on('accepted', () => { console.log("Job accepted") });
  job.on('status', (status) => { 
    console.log(status);
    document.getElementById('progress').style.width = `${status.computed / status.total * 100}%`
  });
  job.on('result', (ev) => {
    if(ev.result) {
      noResult = false; 
      let plot = document.createElement("div");  
      plot.className = 'plot-style';
      plot.setAttribute("id", `plot-${ev.result[0]}`);                                        
      divPlot.appendChild(plot);    
      plot2D(...ev.result);
    }
  });

  job.on('complete', async function() {
    computBtn.style.backgroundColor = '#3da664d9';
    cancelBtn.style.backgroundColor = '#e4e4e4';
    computBtn.innerHTML = 'Compute';
    computBtn.disabled = false;
  });

  await job.exec(dcp.compute.marketValue);
  
  if (noResult) {
    const p = document.createElement('p');
    p.innerHTML = 'There is no perfect rectangular nummber in this interval!'
    document.getElementById("divPlot").appendChild(p);
  }
}

const main = () => {
  let bubble = document.getElementById('bubble');
  let range = document.getElementById('slider');
  range.max = maxRange;
  range.min = 1;
  range.value = 30;
  bubble.innerHTML = '[1, 30]';
  
  range.addEventListener("input", () => {
    bubble.innerHTML = `[1, ${range.value}]`;
  });
  
  document.getElementById('compute-button').addEventListener('click', deployJob);
}

document.addEventListener('DOMContentLoaded', main, false);
