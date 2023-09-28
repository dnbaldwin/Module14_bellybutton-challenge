// load dataset from API

const url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json"

// promise pending

const dataPromise = d3.json(url);
//console.log("Data Promise:", dataPromise);

// Fetch the data and console log it

d3.json(url).then(function(data){

    console.log(data);

    x_data = data.map(function(row){
        return row.samples.otu_ids
    })

    x = data.map(row => row.samples.otu_ids),
    y = data.map(row => row.samples.sample_values)
});