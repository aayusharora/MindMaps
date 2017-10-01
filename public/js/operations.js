/**
 * Created by aayusharora on 9/17/17.
 */

(function() {
    'use strict';

    window.onload = function() {
        var operations = {};
        var user = JSON.parse(localStorage.getItem('user')) || [];
        var userId;
        var emailId;
        var graph = document.getElementById('container-graph');

        if (user) {
            userId = user.uid;
            emailId = user.emailId;
        }

        operations.upload =  function (data) {
            firebase.database().ref('user/' + userId + 'id/' + emailId ).set(data);
        };

        operations.readFile = function() {
            console.log("i AM CALLED")
            var fileInput = document.getElementById('fileInput');
            var fileDisplayArea = document.getElementById('fileDisplayArea');


            var file = fileInput.files[0];
            var textType = /json.*/;

            if(file.type.match(textType)) {
                var reader = new FileReader();
                reader.onload = function (e) {
                    fileDisplayArea.innerText = reader.result;
                    //console.log("result = = = =  =")

                    // operations.upload(reader.result);
                    // window.location = 'd3.html';
                    // window.ref = `[{"name":"Top Level","parent":"null","children":[{"name":"Level 2: A","parent":"Top Level","children":[{"name":"Son of A","parent":"Level 2: A"},{"name":"Daughter of A","parent":"Level 2: A"}]},{"name":"Level 2: B","parent":"Top Level"}]}]`
                    //window.data = reader.result;
                    // window.data2 = JSON.stringify(JSON.parse(reader.result));
                    //console.log(ref === reader.data2);


                    operations.generateGraph(JSON.parse(reader.result))

                };

                reader.readAsText(file);
            }

            else {
                fileDisplayArea.innerText = "File not supported!";
            }


        };

        operations.generateGraph = function (data) {
            // *********** Convert flat data into a nice tree ***************
            // create a name: node map
            var dataMap = data.reduce(function(map, node) {
                map[node.name] = node;
                return map;
            }, {});

            // create the tree array
            var treeData = [];
            data.forEach(function(node) {
                // add to parent
                var parent = dataMap[node.parent];
                if (parent) {
                    // create child array if it doesn't exist
                    (parent.children || (parent.children = []))
                    // add node to child array
                        .push(node);
                } else {
                    // parent is null or missing
                    treeData.push(node);
                }
            });

            // ************** Generate the tree diagram	 *****************
            var margin = {top: 20, right: 120, bottom: 20, left: 120},
                width = 980 - margin.right - margin.left,
                height = 500 - margin.top - margin.bottom;

            var i = 0;

            var tree = d3.layout.tree()
                .size([height, width]);

            var diagonal = d3.svg.diagonal()
                .projection(function(d) { return [d.y, d.x]; });

            var svg = d3.select(graph).append("svg")
                .attr("width", width + margin.right + margin.left)
                .attr("height", height + margin.top + margin.bottom)
                .append("g")
                .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

            var root = treeData[0];

            update(root);

            function update(source) {

                // Compute the new tree layout.
                var nodes = tree.nodes(root).reverse(),
                    links = tree.links(nodes);

                // Normalize for fixed-depth.
                nodes.forEach(function(d) { d.y = d.depth * 180; });

                // Declare the nodes…
                var node = svg.selectAll("g.node")
                    .data(nodes, function(d) { return d.id || (d.id = ++i); });

                // Enter the nodes.
                var nodeEnter = node.enter().append("g")
                    .attr("class", "node")
                    .attr("transform", function(d) {
                        return "translate(" + d.y + "," + d.x + ")"; });

                nodeEnter.append("circle")
                    .attr("r", 10)
                    .style("fill", "#fff");

                nodeEnter.append("text")
                    .attr("x", function(d) {
                        return d.children || d._children ? -13 : 13; })
                    .attr("dy", ".35em")
                    .attr("text-anchor", function(d) {
                        return d.children || d._children ? "end" : "start"; })
                    .text(function(d) { return d.name; })
                    .style("fill-opacity", 1);

                // Declare the links…
                var link = svg.selectAll("path.link")
                    .data(links, function(d) { return d.target.id; });

                // Enter the links.
                link.enter().insert("path", "g")
                    .attr("class", "link")
                    .attr("d", diagonal);

            }
        };

        window.operations = operations;
    }

})();

   function upload () {
       operations.readFile();

   }