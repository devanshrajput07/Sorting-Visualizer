let array = [];

function generateArray(heights) {
  const arrayContainer = document.getElementById("array-container");
  arrayContainer.innerHTML = "";
  array = [];

  for (let i = 0; i < heights.length; i++) {
    array.push(heights[i]);
    const bar = document.createElement("div");
    bar.style.height = `${heights[i] * 4}px`;
    bar.textContent = heights[i];
    bar.className = "array-bar";
    arrayContainer.appendChild(bar);
  }
}

function generateUserArray() {
  const userInput = document.getElementById("userArray").value;
  const heights = userInput.split(",").map((num) => parseInt(num.trim()));

  // Check if the input is valid
  if (heights.some(isNaN)) {
    alert(
      "Invalid input. Please enter a valid list of numbers separated by commas."
    );
    return;
  }

  generateArray(heights);
}

function resetVisual() {
  const userInput = document.getElementById("userArray").value;
  const heights = userInput.split(",").map((num) => parseInt(num.trim()));

  // Check if the input is valid
  if (heights.some(isNaN)) {
    alert(
      "Invalid input. Please enter a valid list of numbers separated by commas."
    );
    return;
  }

  generateArray(heights);
}

async function visualizeSorting() {
  const sortingAlgorithm = document.getElementById("sortingAlgorithm").value;
  switch (sortingAlgorithm) {
    case "bubbleSort":
      await visualizeBubbleSort();
      break;
    case "selectionSort":
      await visualizeSelectionSort();
      break;
    case "insertionSort":
      await visualizeInsertionSort();
      break;
    case "mergeSort":
      await visualizeMergeSort();
      break;
    case "quickSort":
      await visualizeQuickSort();
      break;
    case "heapSort":
      await visualizeHeapSort();
      break;
    case "radixSort":
      await visualizeRadixSort();
      break;
  }
}

async function visualizeBubbleSort() {
  const arrayBars = document.querySelectorAll(".array-bar");
  for (let i = 0; i < arrayBars.length - 1; i++) {
    for (let j = 0; j < arrayBars.length - i - 1; j++) {
      arrayBars[j].style.backgroundColor = "#e74c3c";
      arrayBars[j + 1].style.backgroundColor = "#e74c3c";

      if (array[j] > array[j + 1]) {
        await sleep(50);
        swapBars(arrayBars[j], arrayBars[j + 1]);
        swapArrayValues(j, j + 1);
      }

      arrayBars[j].style.backgroundColor = "#3498db";
      arrayBars[j + 1].style.backgroundColor = "#3498db";
    }
  }
  updateTextContent(arrayBars);
}

async function visualizeSelectionSort() {
  const arrayBars = document.querySelectorAll(".array-bar");
  for (let i = 0; i < arrayBars.length - 1; i++) {
    let minIndex = i;
    arrayBars[i].style.backgroundColor = "#e74c3c";

    for (let j = i + 1; j < arrayBars.length; j++) {
      arrayBars[j].style.backgroundColor = "#e74c3c";
      await sleep(50);

      if (array[j] < array[minIndex]) {
        arrayBars[minIndex].style.backgroundColor = "#3498db";
        minIndex = j;
      } else {
        arrayBars[j].style.backgroundColor = "#3498db";
      }
    }

    await sleep(50);
    swapBars(arrayBars[i], arrayBars[minIndex]);
    swapArrayValues(i, minIndex);
    arrayBars[i].style.backgroundColor = "#3498db";
  }
  updateTextContent(arrayBars);
}

async function visualizeInsertionSort() {
  const arrayBars = document.querySelectorAll(".array-bar");
  for (let i = 1; i < arrayBars.length; i++) {
    let key = array[i];
    let j = i - 1;
    arrayBars[i].style.backgroundColor = "#e74c3c";

    while (j >= 0 && array[j] > key) {
      arrayBars[j + 1].style.height = `${array[j] * 4}px`;
      array[j + 1] = array[j];
      j = j - 1;
      await sleep(50);
    }

    arrayBars[j + 1].style.height = `${key * 4}px`;
    array[j + 1] = key;

    for (let k = 0; k <= i; k++) {
      arrayBars[k].style.backgroundColor = "#3498db";
    }
  }
  updateTextContent(arrayBars);
}

async function visualizeMergeSort() {
  const arrayBars = document.querySelectorAll(".array-bar");
  await mergeSort(arrayBars, 0, arrayBars.length - 1);
  updateTextContent(arrayBars);
}

async function mergeSort(arrayBars, start, end) {
  if (start < end) {
    const mid = Math.floor((start + end) / 2);
    await mergeSort(arrayBars, start, mid);
    await mergeSort(arrayBars, mid + 1, end);
    await merge(arrayBars, start, mid, end);
  }
}

async function merge(arrayBars, start, mid, end) {
  const leftArray = array.slice(start, mid + 1);
  const rightArray = array.slice(mid + 1, end + 1);

  let i = 0,
    j = 0,
    k = start;

  while (i < leftArray.length && j < rightArray.length) {
    if (leftArray[i] <= rightArray[j]) {
      arrayBars[k].style.height = `${leftArray[i] * 4}px`;
      array[k] = leftArray[i];
      i++;
    } else {
      arrayBars[k].style.height = `${rightArray[j] * 4}px`;
      array[k] = rightArray[j];
      j++;
    }
    k++;
    await sleep(50);
  }

  while (i < leftArray.length) {
    arrayBars[k].style.height = `${leftArray[i] * 4}px`;
    array[k] = leftArray[i];
    i++;
    k++;
    await sleep(50);
  }

  while (j < rightArray.length) {
    arrayBars[k].style.height = `${rightArray[j] * 4}px`;
    array[k] = rightArray[j];
    j++;
    k++;
    await sleep(50);
  }
}

async function visualizeQuickSort() {
  const arrayBars = document.querySelectorAll(".array-bar");
  await quickSort(arrayBars, 0, arrayBars.length - 1);
  updateTextContent(arrayBars);
}

async function quickSort(arrayBars, low, high) {
  if (low < high) {
    const partitionIndex = await partition(arrayBars, low, high);
    await quickSort(arrayBars, low, partitionIndex - 1);
    await quickSort(arrayBars, partitionIndex + 1, high);
  }
}

async function partition(arrayBars, low, high) {
  const pivot = array[high];
  let i = low - 1;

  for (let j = low; j < high; j++) {
    if (array[j] < pivot) {
      i++;
      swapBars(arrayBars[i], arrayBars[j]);
      swapArrayValues(i, j);
      await sleep(50);
    }
  }

  swapBars(arrayBars[i + 1], arrayBars[high]);
  swapArrayValues(i + 1, high);
  await sleep(50);

  return i + 1;
}

async function visualizeHeapSort() {
  const arrayBars = document.querySelectorAll(".array-bar");
  let heapSize = arrayBars.length;

  for (let i = Math.floor(heapSize / 2) - 1; i >= 0; i--) {
    await heapify(arrayBars, heapSize, i);
  }

  for (let i = heapSize - 1; i > 0; i--) {
    swapBars(arrayBars[0], arrayBars[i]);
    await sleep(50);
    heapSize--;
    await heapify(arrayBars, heapSize, 0);
  }
  updateTextContent(arrayBars);
}

async function heapify(arrayBars, heapSize, i) {
  let largest = i;
  const left = 2 * i + 1;
  const right = 2 * i + 2;

  if (left < heapSize && array[left] > array[largest]) {
    largest = left;
  }

  if (right < heapSize && array[right] > array[largest]) {
    largest = right;
  }

  if (largest !== i) {
    swapBars(arrayBars[i], arrayBars[largest]);
    swapArrayValues(i, largest);
    await sleep(50);
    await heapify(arrayBars, heapSize, largest);
  }
}

async function visualizeRadixSort() {
  const arrayBars = document.querySelectorAll(".array-bar");
  const max = Math.max(...array);
  await radixSort(arrayBars, max);
  updateTextContent(arrayBars);
}

async function radixSort(arrayBars, max) {
  for (let exp = 1; Math.floor(max / exp) > 0; exp *= 10) {
    await countingSortForRadix(arrayBars, exp);
  }
}

async function countingSortForRadix(arrayBars, exp) {
  const output = Array.from(arrayBars);
  const countArray = Array(10).fill(0);

  for (let i = 0; i < arrayBars.length; i++) {
    const value = array[i];
    countArray[Math.floor(value / exp) % 10]++;
  }

  for (let i = 1; i < countArray.length; i++) {
    countArray[i] += countArray[i - 1];
  }

  for (let i = arrayBars.length - 1; i >= 0; i--) {
    const value = array[i];
    const position = countArray[Math.floor(value / exp) % 10] - 1;
    output[position].style.height = `${value * 4}px`;
    array[i] = value;
    countArray[Math.floor(value / exp) % 10]--;
    await sleep(50);
  }

  for (let i = 0; i < arrayBars.length; i++) {
    arrayBars[i].style.height = output[i].style.height;
    await sleep(50);
  }
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// Initial array generation
generateArray([
  /* default values */
]);

function swapBars(bar1, bar2) {
  const tempHeight = bar1.style.height;
  bar1.style.height = bar2.style.height;
  bar2.style.height = tempHeight;
}

function swapArrayValues(index1, index2) {
  const temp = array[index1];
  array[index1] = array[index2];
  array[index2] = temp;
}

function updateTextContent(arrayBars) {
  for (let i = 0; i < arrayBars.length; i++) {
    const value = parseInt(arrayBars[i].style.height) / 4;
    arrayBars[i].textContent = value;
  }
}
