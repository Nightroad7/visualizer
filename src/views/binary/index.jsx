import React, { Component } from "react";

import mitchTree from 'd3-mitch-tree';
import './d3-mitch-tree-theme-default.min.css';
import './d3-mitch-tree.min.css';

class Binary extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tipo: "",
            ley: [],
            reglamento: [],
            open: false,
            articulo: "",
            descripcion: [],
            expanded: false,
            titulo: "",
            width: null,
            height: null,
            isClient: typeof window === 'object',
            size: 0,
            tree: null
        };
    }

    handleResize = () => {
        this.setState(
            {
                width: this.state.isClient ? window.innerWidth : undefined,
                height: this.state.isClient ? window.innerHeight : undefined
            }
        )
    }

    UNSAFE_componentWillMount() {
        window.addEventListener('resize', this.handleResize);
        this.setState({
            width: this.state.isClient ? window.innerWidth : undefined,
            height: this.state.isClient ? window.innerHeight : undefined
        })
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.handleResize)
    }

    componentDidMount() {
        this.scriptLoaded();
    }

    scriptLoaded = () => {
        let data = {
            id: 1,
            name: "data",
            type: "Root",
            description: "",
            children: [
                {
                    id: 2,
                    name: "Ley de Compras",
                    type: "Type",
                    description: "",
                    children: [0, 1, 2, 3].map(res => ({
                        id: res,
                        name: res,
                        articulo: res,
                        descripcion: res,
                        description: res,
                        titulo: "Ley de Compras",
                        children: []
                    }))
                },
                {
                    id: 3,
                    name: "Reglamento",
                    type: "Type",
                    description: "",
                    children: [0, 1, 2].map(res => ({
                        id: res,
                        name: res,
                        articulo: res,
                        descripcion: res,
                        description: res,
                        titulo: "Reglamento"
                    }))
                }
            ]
        };

        let treePlugin = new mitchTree.circleTree()
            .setAllowZoom(true)
            .setAllowPan(true)
            .setAllowNodeCentering(true)
            .setData(data)
            .setElement(document.getElementById("visualisation"))
            .setIdAccessor(function (data) {
                data = item => console.log(item, "item");
                return data.id;
            })
            .setChildrenAccessor(function (data) {
                return data.children;
            })
            .setDisplayTextAccessor(function (data) {
                return data.name;
            })
            .on("nodeClick", (event) => {
                // this.clickNodesHandler(event);
            })
            .initialize();

        this.setState({
            tree: treePlugin
        });
    };

    render() {
        return (
            <div id="padre">
                <div id="visualisation" style={styles.visualization} />
            </div>
        );
    }
}

const styles = {
    container: {
        width: '100%',
        height: '80vh',
        justifyContent: 'center',
        textAlign: 'center',
        marginTop: "50px"
    },
    paper: {
        width: "80%",
        height: '100%',
        textAlign: "center",
        alignContent: "center",
        margin: 'auto'
    },
    paperMin: {
        width: "100%",
        height: '100%',
        textAlign: "center",
        alignContent: "center",
        margin: 'auto'
    },
    article: {
        padding: "5%"
    },
    visualisation_container: {
        display: 'flex',
        flexDirection: 'row',
        width: "100%",
        height: '100%',
    },
    visualisation_container_min: {
        display: 'flex',
        flexDirection: 'column',
        width: "100%",
        height: '100%',
    },
    visualization: {
        width: "100%",
        height: '100%',
    },
    backbutton: {
        color: 'rgb(0, 136, 204)',
        background: 'none',
        border: 'none',
        outline: 'none',
        // height: '100px',
        // margin: 'auto'
    },
    buttonContainer: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between'
    },
    buttonContainerMin: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between'
    }
};

export default Binary;
