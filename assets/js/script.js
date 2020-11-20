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
      this.selected_provinceName = null;
      this.showAllMerchants();
    },
    selectProvince: async function (event) {
      if (event.target.value == -1) {
        this.showAllMerchants();
        this.selected_province = -1;
      } else {
        this.selected_provinceName = this.data.provinces[event.target.value];
        this.calculateResultByProvince();
        this.selected_province = event.target.value;
      }


    },
    selectAllCategory: async function (event) {

      this.selected_categoryName = null;
      this.result_merchants = this.data.merchants;

      this.subcategory = null;
      this.selected_subcategory = null;
      this.selected_subcategoryName = "ทั้งหมด";

    },

    selectSubCategory: async function (event) {

      if (event.target.value == -1) {
        this.calculateResultByCategory();

      } else {
        this.selected_subcategoryName = event.target.value;
        console.log("selected_subcatName : " + this.selected_subcategoryName);
        this.calculateResultBySubCategory();
      }
    },
    showSubCategory: async function (event) {

      this.selected_category = this.data.categories[event.target.value];
      this.selected_categoryName = this.data.categories[event.target.value].name
      this.subcategory = this.data.categories[event.target.value].subcategories;
      this.calculateResultByCategory();
    },
    fetchData: async () => {
      return axios
        .get('https://panjs.com/ywc18.json')
        .then((response) => {
          return response.data;
        })
        .catch((error) => {
          console.log(error);
        })
    },
    showAllMerchants: async function (...args) {
      let data = await this.fetchData();
      this.result_merchants = data.merchants;
    },
    calculateResultByCategory: function (...args) {
      let data_merchants = this.data.merchants;
      this.result_merchants = [];
      for (let index = 0; index < data_merchants.length; index++) {
        if (this.selected_category.subcategories.includes(data_merchants[index].subcategoryName)) {
          this.result_merchants.push(data_merchants[index]);
        }
      }
    },
    calculateResultBySubCategory: function (...args) {
      let data_merchants = this.data.merchants;
      this.result_merchants = [];
      for (let index = 0; index < data_merchants.length; index++) {
        console.log(data_merchants[index].subcategoryName);
        if (data_merchants[index].subcategoryName == this.selected_subcategoryName) {
          this.result_merchants.push(data_merchants[index]);
        }
      }
    },
    calculateResultByProvince: function (...args) {
      let data_merchants = this.data.merchants;
      this.result_merchants = [];
      for (let index = 0; index < data_merchants.length; index++) {
        console.log(data_merchants[index].addressProvinceName);
        if (data_merchants[index].addressProvinceName == this.selected_provinceName) {
          this.result_merchants.push(data_merchants[index]);
        }
      }
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
    calculateResultByPrice: function (event) {
      let lowPrice = event.target[0].value;
      let maxPrice = event.target[1].value;
      
    }
  }

})
