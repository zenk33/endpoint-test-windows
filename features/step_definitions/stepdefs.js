const assert = require("assert");
const { Given, When, Then } = require("cucumber");
const config = require("../../config");
const fetch = require("node-fetch");

//visitURL = go to endpoint and get response
const visitURL = () => {
  return fetch(config.service_endpoint);
};

//getJSonResponse - get response in JSON
const getJsonResponse = async () => {
  const data = await visitURL();
  return data.json();
};

//getNumberOfItems - get number of items in the JSON response
const getNumberOfItems = async () => {
  const data = await getJsonResponse();
  return data.items.length;
};

//getAllItems - get all the items in the JSON response
const getAllItems = async () => {
  const data = await getJsonResponse();
  return data.items;
};

//When: I successfully access the endpoint
When("I successfully access the endpoint", async function() {
  const res = await visitURL();
  assert.equal(res.status, 200);
});

//Then: I should see 30 items
Then("I should see {int} items", async function(expectedAnswer) {
  const num = await getNumberOfItems();
  assert.equal(num, expectedAnswer);
});

//AND: All items should have a fields object
Then("All items should have a fields object", async function() {
  const allFields = await getAllItems();
  allFields.forEach((element, index) => {
    if (element.fields == undefined) {
      throw `Item at index ${index} has no field object defined!`;
    }
  });
});

//AND: All field titles should be defined
Then("All field titles should be defined", async function() {
  const allFields = await getAllItems();
  allFields.forEach((element, index) => {
    if (element.fields.title == undefined) {
      throw `Field object with index ${index} has no title defined!`;
    }
  });
});
