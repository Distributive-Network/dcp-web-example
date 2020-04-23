/**
 * @file   index.js
 * @author Nazila Akhavan nazila@kingsds.network
 * @date   April 2020
 * 
 * Sample web application showing how to deploy a DCP job.
 */
document.addEventListener('DOMContentLoaded', main);

let results = [];

function main () {
  let inputA = document.getElementById('inputA');
  let inputB = document.getElementById('inputB');
  
  inputA.addEventListener("input", () => {
    let a = Number(inputA.value);
    let b = Number(inputB.value);
    if (a > b) inputB.value = a;
  });
  
  inputB.addEventListener("input", () => {
    let a = Number(inputA.value);
    let b = Number(inputB.value);
    if (a > b) inputA.value = b;
  });

  document.getElementById('compute-button').addEventListener('click', deployJob);
}

function deployJob () {
  let computeBtn = document.getElementById('compute-button');
  let inputA = document.getElementById('inputA');
  let inputB = document.getElementById('inputB');
  let a = Number(inputA.value);
  let b = Number(inputB.value);

  setStatus('Deploying job.');

  computeBtn.disabled = true;

  let job = dcp.compute.for(a, b, function (number) {
    progress(0);
    let sum = 0;
    for (let i = 1; i <= number; i++) {
      sum += i;
      console.log(sum);
      if(sum === number) {
        return number;
      } else if ( sum > number) {
        return false;
      } else {
        progress(sum / number);
      }
    };

  });

  job.public.name = 'DCP Example - Triangular Numbers';
  job.work.on('uncaughtException', (e) => alert(e));
  job.on('accepted', () => {
    setStatus('Job accepted; distributing slices.');
    document.getElementById('resultsMsg').hidden = false;
    document.getElementById('progress-container').hidden = false;
  });
  job.on('status', (status) => {
    setStatus(`${status.computed} out of ${status.total} results computed. ${status.distributed} distributed.`);
    document.getElementById('progressbar').style.width = `${status.computed / status.total * 100}%`;
  });
  job.on('result', logResult);
  job.on('complete', () => computeBtn.disabled = false);
  try {
    job.exec(dcp.compute.marketValue);
  } catch (error) {
    alert(error);
  }
}

function setStatus (newStatus) {
  document.getElementById('status').innerText = newStatus;
}

function logResult (event) {
  if (!event.result) return; // Work function returns false for non-triangular numbers.
  results.push(event.result);

  let resultsText;
  if (results.length === 1) {
    resultsText = `only ${results[0]}.`;
  } else {
    const allButLast = results.slice(0, -1);
    const last = results.slice(-1)[0];
    resultsText = `${allButLast.join(', ')} and ${last}.\n`;
  }
  document.getElementById('results').innerText = resultsText;
}