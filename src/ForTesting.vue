<script>

function getValueByPath(obj, path) {
  return path.reduce((acc, key, index) => {
    return acc?.[key];
  }, obj);
}

function  returnStrings(array) {
    return path.filter((item) => typeof item === "string");
  }

// Example usage
const objectTree = {
  cocktails: [
    { name: "Margarita", ingredients: ["Tequila", "Lime Juice"] },
    { name: "Old Fashioned", ingredients: ["Whiskey", "Bitters"] },
    { name: "Mojito", ingredients: ["Rum", "Mint"] },
  ],
  otherData: {
    key: "value",
  },
};

const path = [['cocktails', null]];

const handleClickItem = (number) => {
  let indexLastNode = path.length - 1;
  let value = path[indexLastNode][1];

  if(value === null) {
    path[indexLastNode][1] = number;
  } else if (value === number) {
    path[indexLastNode][1] = null;
  }
}

handleClickItem(2);





</script>

<template>
  <div>{{ result }}</div>
</template>
