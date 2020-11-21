const results = [];

function main() {
  const inputA = document.getElementById('inputA');
  const inputB = document.getElementById('inputB');

  inputA.addEventListener('input', () => {
    const a = Number(inputA.value);
    const b = Number(inputB.value);
    if (a > b) inputB.value = a;
  });

  inputB.addEventListener('input', () => {
    const a = Number(inputA.value);
    const b = Number(inputB.value);
    if (a > b) inputA.value = b;
  });

  document
    .getElementById('compute-button')
    .addEventListener('click', deployJob);
}

async function deployJob() {
  const computeBtn = document.getElementById('compute-button');
  const inputA = document.getElementById('inputA');
  const inputB = document.getElementById('inputB');
  const a = Number(inputA.value);
  const b = Number(inputB.value);

  setStatus('Deploying job.');

  computeBtn.disabled = true;

  const job = window.dcp.compute.for(a, b, (number) => {
    progress(0);
    let sum = 0;
    for (let i = 1; i <= number; i += 1) {
      sum += i;
      if (sum === number) {
        return number;
      }
      if (sum > number) {
        return false;
      }
      progress(sum / number);
    }
  });

  job.public.name = 'DCP Example - Triangular Numbers';
  job.work.on('uncaughtException', (e) => alert(e));
  job.on('accepted', () => {
    setStatus('Job accepted; distributing slices.');
    document.getElementById('resultsMsg').hidden = false;
    document.getElementById('progress-container').hidden = false;
  });
  job.on('status', (status) => {
    setStatus(
      `${status.computed} out of ${status.total} results computed. ${status.distributed} distributed.`,
    );
    document.getElementById('progressbar').style.width = `${
      (status.computed / status.total) * 100
    }%`;
  });
  job.on('result', logResult);
  job.on('complete', () => {
    computeBtn.disabled = false;
  });

  try {
    // await job.exec();
    // OR
    await job.localExec();
  } catch (error) {
    alert(error);
  }
}

function setStatus(newStatus) {
  document.getElementById('status').innerText = newStatus;
}

function logResult(event) {
  // Work function returns false for non-triangular numbers.
  if (!event.result) {
    return;
  }
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

document.addEventListener('DOMContentLoaded', main);
