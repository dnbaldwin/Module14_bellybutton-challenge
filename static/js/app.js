// load dataset from API

const url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json";


let metadata;
let samples;

d3.json(url).then(function(data) {
    let dropdownSelect = d3.select('#selDataset');

    // set data variables

    metadata = data.metadata;

    
    samples = data.samples;

    // console.log(samples[1].sample_values.slice(0, 10));


    // setup the dropdownSelect

    data.names.forEach((id) => {
        dropdownSelect.append("option").text(id).property("value", id);
    });

    doMetadata(metadata[0]);
    doCharts(samples[0]);
});


function optionChanged(selectedId) {

    // sort by 

    var selectedIdSamples = samples.find((e) => e.id == selectedId);

    var selectedIdMetadata = metadata.find((e) => e.id.toString() == selectedId);

    // update demographics and charts with new selection

    doCharts(selectedIdSamples);

    doMetadata(selectedIdMetadata);

};

function doMetadata(selectedIdMetdata) {
    console.log(selectedIdMetdata);
    let demographicsBox = d3.select("#sample-metadata");
    demographicsBox.html("");
    Object.entries(selectedIdMetdata).forEach(([key, value]) => {
        demographicsBox.append("p").text(`${key}: ${value}`);
    });
};

function doCharts(selectedIdSamples) {
    console.log(selectedIdSamples);

    // Bar Plot

    x_axis_values = selectedIdSamples.sample_values;
    console.log(x_axis_values);

    y_axis_values = selectedIdSamples.otu_ids;

    console.log(y_axis_values);

    trace1 = [{
        x: x_axis_values.slice(0,10).reverse(),
        y: y_axis_values.slice(0,10).map(otuID => `OTU ${otuID}`).reverse(),
        //text: otu_labels,
        name: "Belly Button Microbiome Biodiversity Data",
        type: "bar",
        orientation: "h",

    }];

    layout = {
        title: "Top Ten OTUs Identified",
        xaxis: {
            title: "Colony Count"
        },
        yaxis: {
            title: "Colony Identifier (OTU)"
        },
        width: 640,
        height: 480
    };

    Plotly.newPlot("bar", trace1, layout);

    // Bubble Plot

    let layout2 = {
        title: "OTU cultures in Selected Individual",
        xaxis: {
            title: "OTU_Id"
        },
        yaxis: {
            title: "Colony Count"
        },
        width: 800,
        height: 600
    };

    let trace2 = [{
        x: selectedIdSamples.otu_ids,
        y: selectedIdSamples.sample_values,
        mode: "markers",
        marker: {
            size: selectedIdSamples.sample_values,
            color: selectedIdSamples.otu_ids,
            colorscale: "Electric"
        },
        
    }];

    Plotly.newPlot("bubble", trace2, layout2);
};