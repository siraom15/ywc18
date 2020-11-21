const app = new Vue({
  el: '#app',
  data: {
    data: null,

    category: null,
    selected_category: null,
    selected_categoryName: null,

    subcategory: null,
    selected_subcategory: null,
    selected_subcategoryName: "ทั้งหมด",

    selected_province: -1,
    selected_provinceName: null,

    selected_priceRange: -1,
    // selected_priceRangeName: null,
    search_input: '',
    result_merchants: [],
  },
  mounted() {
    axios
      .get('https://panjs.com/ywc18.json')
      .then((response) => {
        this.data = response.data;
        this.result_merchants = this.data.merchants;
      })
      .catch((error) => {
        console.log(error);
      })
  },
  methods: {
    selectAllProvince: async function (event) {
      this.selected_province = -1;
      this.selected_provinceName = null;
      this.calculateResult();
    },
    selectProvince: async function (event) {
      if (event.target.value == -1) {
        this.selected_province = -1;
      } else {
        this.selected_provinceName = this.data.provinces[event.target.value];
        this.selected_province = event.target.value;
      }
      this.calculateResult();

    },
    selectPriceRange: async function (event) {
      if (event.target.value == -1) {
        this.selected_priceRange = -1;
        // this.calculateResult();
      } else {
        // console.log(event.target.value);
        // this.selected_priceRangeName = this.data.priceRange[event.target.value];
        this.selected_priceRange = event.target.value;
      }
      this.calculateResult();
      // this.calculateResultByPrice();
    },

    selectAllCategory: async function (event) {

      this.result_merchants = this.data.merchants;

      this.selected_category = null,
        this.selected_categoryName = null;

      this.subcategory = null;
      this.selected_subcategory = null;
      this.selected_subcategoryName = "ทั้งหมด";

    },

    selectSubCategory: async function (event) {

      if (event.target.value == -1) {
        this.selected_subcategoryName = null;
      } else {
        this.selected_subcategoryName = event.target.value;
        console.log("selected_subcatName : " + this.selected_subcategoryName);
      }
      this.calculateResult();
    },

    showSubCategory: async function (event) {

      this.selected_category = this.data.categories[event.target.value];
      this.selected_categoryName = this.data.categories[event.target.value].name
      this.subcategory = this.data.categories[event.target.value].subcategories;
      this.selected_subcategoryName = "ทั้งหมด";
      this.calculateResult();
    },
    fetchData: async function () {
      return axios
        .get('https://panjs.com/ywc18.json')
        .then((response) => {
          return response.data;
        })
        .catch((error) => {
          console.log(error);
        })
    },
    calculateResultBySearch: function (event) {
      let data_merchants = this.data.merchants;
      let search_name = event.target[1].value.trim();

      this.result_merchants = [];
      for (let index = 0; index < data_merchants.length; index++) {
        if (data_merchants[index].shopNameTH.includes(search_name)) {
          this.result_merchants.push(data_merchants[index]);
        }
      }
    },

    calculateResultByPrice: async function () {
      let data_merchants = this.data.merchants;
      this.result_merchants = [];
      for (let index = 0; index < data_merchants.length; index++) {
        if (data_merchants[index].priceLevel == this.selected_priceRange) {
          this.result_merchants.push(data_merchants[index]);
        }
      }
    },
    calculateResult: async function () {

      let data_merchants = this.data.merchants;
      this.result_merchants = [];

      // select cat sub pro price
      if (this.selected_province != -1 & this.selected_subcategoryName != null & this.selected_subcategoryName != "ทั้งหมด" & this.selected_priceRange != -1) {
        console.log("เลือกทั้งหมด");
        for (let index = 0; index < data_merchants.length; index++) {
          if (data_merchants[index].addressProvinceName == this.selected_provinceName
            && data_merchants[index].subcategoryName == this.selected_subcategoryName
            && this.selected_category.subcategories.includes(data_merchants[index].subcategoryName)
            && data_merchants[index].priceLevel == this.selected_priceRange) {
            this.result_merchants.push(data_merchants[index]);
          }
        }
      }



      // select cat subcat province
      else if (this.selected_province != -1 & this.selected_subcategoryName != null & this.selected_subcategoryName != "ทั้งหมด") {
        console.log("เลือก cat subcat province ");
        for (let index = 0; index < data_merchants.length; index++) {
          if (data_merchants[index].addressProvinceName == this.selected_provinceName
            && data_merchants[index].subcategoryName == this.selected_subcategoryName
            && this.selected_category.subcategories.includes(data_merchants[index].subcategoryName)) {
            this.result_merchants.push(data_merchants[index]);
          }
        }
      }
      // select cat & province & price
      else if (this.selected_category != null & this.selected_province != -1 & this.selected_priceRange != -1) {
        console.log("เลือก cat & pro & price");

        for (let index = 0; index < data_merchants.length; index++) {
          if (data_merchants[index].addressProvinceName == this.selected_provinceName
            && this.selected_category.subcategories.includes(data_merchants[index].subcategoryName)
            && data_merchants[index].priceLevel == this.selected_priceRange) {
            this.result_merchants.push(data_merchants[index]);
          }
        }
      }
      // select cat & province
      else if (this.selected_category != null & this.selected_province != -1) {
        console.log("เลือก cat & pro");

        for (let index = 0; index < data_merchants.length; index++) {
          if (data_merchants[index].addressProvinceName == this.selected_provinceName
            && this.selected_category.subcategories.includes(data_merchants[index].subcategoryName)
          ) {
            this.result_merchants.push(data_merchants[index]);
          }
        }
      }


      // select subcat & price
      else if (this.selected_subcategoryName != "ทั้งหมด" & this.selected_province != -1 & this.selected_priceRange != -1) {
        console.log(this.selected_subcategoryName);
        console.log("เลือก subcat & price");
        for (let index = 0; index < data_merchants.length; index++) {
          if (data_merchants[index].subcategoryName == this.selected_subcategoryName && data_merchants[index].priceLevel == this.selected_priceRange) {
            this.result_merchants.push(data_merchants[index]);
          }
        }
      }

      // select subcat
      else if (this.selected_subcategoryName != "ทั้งหมด") {
        console.log(this.selected_subcategoryName);
        console.log("เลือก subcat");
        for (let index = 0; index < data_merchants.length; index++) {
          if (data_merchants[index].subcategoryName == this.selected_subcategoryName) {
            this.result_merchants.push(data_merchants[index]);
          }
        }
      }

      // select cat & price
      else if (this.selected_category != null & this.selected_priceRange != -1) {
        console.log("เลือก cat price");

        for (let index = 0; index < data_merchants.length; index++) {
          if (this.selected_category.subcategories.includes(data_merchants[index].subcategoryName) && data_merchants[index].priceLevel == this.selected_priceRange) {
            this.result_merchants.push(data_merchants[index]);
          }
        }
      }

      // select cat
      else if (this.selected_category != null) {
        console.log("เลือก cat ");

        for (let index = 0; index < data_merchants.length; index++) {
          if (this.selected_category.subcategories.includes(data_merchants[index].subcategoryName)) {
            this.result_merchants.push(data_merchants[index]);
          }
        }
      }

      // select province & price
      else if (this.selected_province != -1 & this.selected_priceRange != -1) {
        console.log("เลือก pro price");

        for (let index = 0; index < data_merchants.length; index++) {
          if (data_merchants[index].addressProvinceName == this.selected_provinceName && data_merchants[index].priceLevel == this.selected_priceRange) {
            this.result_merchants.push(data_merchants[index]);
          }
        }
      }

      // select province
      else if (this.selected_province != -1) {
        console.log("เลือก pro");

        for (let index = 0; index < data_merchants.length; index++) {
          if (data_merchants[index].addressProvinceName == this.selected_provinceName) {
            this.result_merchants.push(data_merchants[index]);
          }
        }
      }
      // select price
      else if (this.selected_priceRange != -1) {
        console.log("เลือก price");

        for (let index = 0; index < data_merchants.length; index++) {
          if (data_merchants[index].priceLevel == this.selected_priceRange) {
            this.result_merchants.push(data_merchants[index]);
          }
        }
      }
      // show all
      else {
        console.log("โชว์หมด");

        let data = await this.fetchData();
        this.result_merchants = data.merchants;
      }



    }
  }

})

