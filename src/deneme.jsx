const filteredList = data.filter((product) => {
    if (selectedCategory && product.category !== selectedCategory) {
      return false;
    }

    if (inputFilter && !product.title.toLowerCase().includes(inputFilter.toLowerCase())) {
      return false;
    }

    return true;
  });