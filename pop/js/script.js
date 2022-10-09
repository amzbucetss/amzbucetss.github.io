// Dom Elements 
// *** Create Elements ***
const createResultRandomEl = document.getElementById('createResultRandom');
const createResultCLIEL = document.getElementById('createResultCLI');
const regionEl = document.getElementById('region');
const lengthEl = document.getElementById('length');
const bucketNumberEL = document.getElementById('bucketNumber');
const lowercaserEL = document.getElementById('lowercaser');
const numberEL = document.getElementById('number');
const symbolEL = document.getElementById('symbol');
const generateRandomEL = document.getElementById('generateRandom');
const generateCLIEL = document.getElementById('generateCLI');

const createResultRandomCopyEl = document.getElementById('createResultRandomCopy');
const createResultCLICopyEl = document.getElementById('createResultCLICopy');


// -- Generate event listen --
generateRandomEL.addEventListener('click', () => {
    const length = +lengthEl.value;
    const bucketNumber = +bucketNumberEL.value;
    const hasLowercaser = lowercaserEL.checked;
    const hasNumber = numberEL.checked;
    const hasSymbol = symbolEL.checked;

    if (bucketNumber < 1 || bucketNumber > 1000 ||  length < 3 || length > 63) {
        createResultRandomEl.innerHTML = 'Please enter a valid Characters Length {3-63} \nOr valid Buckets Number {1-1000}';
    }else{
        createResultRandomEl.innerHTML = randomGenerator2(bucketNumber);
    }
    
    function randomGenerator2(bucketNumber) {
        let allResult = '';
        let nl = '\n';
        
        for (let i = 0; i < bucketNumber; i++) {

            if (i == bucketNumber - 1) {
                nl = '';
              }

           let counter = randomGenerator(hasLowercaser, hasNumber, hasSymbol, length) + nl;
           allResult += counter;
        }

        if (allResult.trim() !== '') {
            return allResult + "\n";
        }else{
            return 'Please check your checked parameters';
        }
        
    }
});

generateCLIEL.addEventListener('click', () => {
    const region = regionEl.value;
    const createResultRandom = createResultRandomEl.value;

    let arr = [],
    buckets = createResultRandom.trim(),
    arrElem = buckets.split("\n");

    if (buckets !== "") {

    for (let i = 0; i < arrElem.length; i++) {
        var sot = arrElem[i].trim();
        var sota = "aws s3 mb s3://" + sot + ' --region ' + region;
        arr.push(sota);
    }

    createResultCLIEL.innerHTML = arr.join("\n") + "\n";

  }else{
    createResultCLIEL.innerHTML = "Error: Please Enter your Buckets"
  }

});

// -- Generate random function --
function randomGenerator(lower, number, symbol, length) {

    let generateRN = '';
    
    const typesCount = lower + number + symbol;

    const typesArr = [{lower}, {number}, {symbol}].filter(item => Object.values(item)[0]);

    if (typesCount === 0) {
        return ''; 
    }

    for (let i = 0; i < length; i += typesCount) {
        
        typesArr.forEach(type => {
            const funcName = Object.keys(type)[0];
            generateRN += randomFunction[funcName]();
        });


    }

    const finalRandom = generateRN.slice(0, length);

    return finalRandom;
}

// *** Copy Elements ***
const bucketsCpoyResultEl = document.getElementById('bucketsCpoyResult');
const copyResultCLIEL = document.getElementById('copyResultCLI');
const originalBucketEl = document.getElementById('originalBucket');
const generateCopyCLIEL = document.getElementById('generateCopyCLI');
const copyResultCLICopyEL = document.getElementById('copyResultCLICopy');


// -- Generate event listen --
generateCopyCLIEL.addEventListener('click', () => {
    const oBucket = originalBucketEl.value;
    const cpoyBuckets = bucketsCpoyResultEl.value;

    let arr = [],
    buckets = cpoyBuckets.trim(),
    arrElem = buckets.split("\n");

    if (buckets !== "" && oBucket !== "") {

        for (let i = 0; i < arrElem.length; i++) {
            /*
            let sota = "";
            if (i === 0) {
                sota = "aws s3 s3://" + oBucket + " --acl public-read \n";
            }
            */
            let sot = arrElem[i].trim();
            let sota = "aws s3 cp s3://" + oBucket + " s3://" + sot + " --recursive --acl public-read";
            arr.push(sota);
        }

        copyResultCLIEL.innerHTML = arr.join("\n") + "\n";

  }else{
    if (oBucket == "") {
        copyResultCLIEL.innerHTML = "Error: Please Enter your Original Bucket"
    }else{
        copyResultCLIEL.innerHTML = "Error: Please Enter your Buckets"
    }
  }

});

// *** Delete Elements ***

const deleteListsCLIEl = document.getElementById('deleteListsCLI');
const deleteResultCLIEL = document.getElementById('deleteResultCLI');
const generateDeleteCLIEl = document.getElementById('generateDeleteCLI');
const deleteResultCLICopyEl = document.getElementById('deleteResultCLICopy');

// -- Generate event listen --
generateDeleteCLIEl.addEventListener('click', () => {
    const DeleteBuckets = deleteListsCLIEl.value;

    let arr = [],
    buckets = DeleteBuckets.trim(),
    arrElem = buckets.split("\n");

    if (buckets !== "") {

        for (let i = 0; i < arrElem.length; i++) {
            let sot = arrElem[i].trim();
            let sota = "aws s3 rb s3://" + sot + " --force";
            arr.push(sota);
        }

        deleteResultCLIEL.innerHTML = arr.join("\n") + "\n";

  }else{
    deleteResultCLIEL.innerHTML = "Error: Please Enter your Buckets"
  }

});

// Generator Function 

const randomFunction = {
    lower: getRnadomLower,
    number: getRnadomNumber,
    symbol: getRnadomSymbol
};

function getRnadomLower() {
    return String.fromCharCode(Math.floor(Math.random() * 26) + 97);
}

function getRnadomNumber() {
    return String.fromCharCode(Math.floor(Math.random() * 10) + 48);
}

function getRnadomSymbol() {
    const symbols = '.-';
    return symbols[Math.floor(Math.random() * symbols.length)];
}

// Copy random generator to clipboard
// - 1
function createResultRandomCopy(text, el) {
    //copyTextarea.focus();
    createResultRandomEl.select();
    navigator.clipboard.writeText(createResultRandomEl.value);
    let elOriginalText = el.attr('data-bs-original-title');
    let msg = 'Copied!';
    el.attr('data-bs-original-title', msg).tooltip('show');
    el.attr('data-bs-original-title', elOriginalText);
    
  }

  $(document).ready(function() {
    
    $('.js-tooltip-RandomCopy').tooltip();

    $('.js-RandomCopy').click(function() {
      var text = $(this).attr('data-copy');
      var el = $(this);
      createResultRandomCopy(text, el);
    });

  });

// - 2
  function createResultCLICopy(text, el) {
    //copyTextarea.focus();
    createResultCLIEL.select();
    navigator.clipboard.writeText(createResultCLIEL.value);
    let elOriginalText = el.attr('data-bs-original-title');
    let msg = 'Copied!';
    el.attr('data-bs-original-title', msg).tooltip('show');
    el.attr('data-bs-original-title', elOriginalText);
    
  }

  $(document).ready(function() {
    
    $('.js-tooltip-CLICopy').tooltip();

    $('.js-CLICopy').click(function() {
      var text = $(this).attr('data-copy');
      var el = $(this);
      createResultCLICopy(text, el);
    });

  });

  // - 3

  function copyResultCLICopy(text, el) {
    //copyTextarea.focus();
    copyResultCLIEL.select();
    navigator.clipboard.writeText(copyResultCLIEL.value);
    let elOriginalText = el.attr('data-bs-original-title');
    let msg = 'Copied!';
    el.attr('data-bs-original-title', msg).tooltip('show');
    el.attr('data-bs-original-title', elOriginalText);
    
  }

  $(document).ready(function() {
    
    $('.js-tooltip-copyCLICopy').tooltip();

    $('.js-copyCLICopy').click(function() {
      var text = $(this).attr('data-copy');
      var el = $(this);
      copyResultCLICopy(text, el);
    });

  });

  // - 4

  function deleteListsCLICopy(text, el) {
    //copyTextarea.focus();
    deleteResultCLIEL.select();
    navigator.clipboard.writeText(deleteResultCLIEL.value);
    let elOriginalText = el.attr('data-bs-original-title');
    let msg = 'Copied!';
    el.attr('data-bs-original-title', msg).tooltip('show');
    el.attr('data-bs-original-title', elOriginalText);
    
  }

  $(document).ready(function() {
    
    $('.js-tooltip-deleteCLICopy').tooltip();

    $('.js-deleteCLICopy').click(function() {
      var text = $(this).attr('data-copy');
      var el = $(this);
      deleteListsCLICopy(text, el);
    });

  });

  // tooltip bootstrap

let tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
let tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
  return new bootstrap.Tooltip(tooltipTriggerEl)
});
