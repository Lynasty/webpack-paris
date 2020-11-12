class Search {
    constructor(logged = false) {
        this.viewUrl = "views/search.html";
        this.dataSet = "";
    }
    executeHttpRequest() {
        console.log("TODO - gestion du formulaire");
        document
                .querySelector("#formSearch")
                .addEventListener("submit", function (e) {
                    e.preventDefault();
                    const dateStart = document.querySelector("#dateStart").value;
                    fetch(`https://opendata.paris.fr/api/records/1.0/search/?dataset=que-faire-a-paris-&q=&facet=date_start&refine.date_start=${dateStart}`)
                            .then(response => {
                                return response.json();
                            })
                            .then(response => {
                                let content = "<h3>Search result(s)</h3>";
                                this.dataSet = response.records;
                                console.log(response.records);
                                const dataContainer = document.querySelector("#container-search");
                                this.dataSet.forEach(function (item) {
                                    content += "<h4>" + item.fields.title + "</h4>";
                                    content += item.fields.description + "<hr>";
                                });
                                dataContainer.innerHTML = content;
                            });
                });

    }
}

export default Search;