import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Fuse from 'fuse.js'

export default class ReachSearchBox extends Component {

    static propTypes = { value: PropTypes.string, placeholder: PropTypes.string, data: PropTypes.array.isRequired, max: PropTypes.number };
    static defaultProps = { value: '', data: [], max: 1 };

    constructor(props) {
        super(props);
        this.state = {
            value: '',
            saved_values: [],
            matchedRecords: [],
        }
        const {max } = props;
        const { data } = props;
        const options = {      /**       * At what point does the match algorithm give up. A threshold of 0.0       * requires a perfect match (of both letters and location), a threshold       * of 1.0 would match anything.       */      
            threshold: 0.05,      /**       * Determines approximately where in the text is the pattern expected to be found.       */      
            location: 0,      /**       * Determines how close the match must be to the fuzzy location       * (specified by location). An exact letter match which is distance       * characters away from the fuzzy location would score as a complete       * mismatch. A distance of 0 requires the match be at the exact       * location specified, a distance of 1000 would require a perfect       * match to be within 800 characters of the location to be found       * using a threshold of 0.8.       */      
            distance: 100,      /**       * When set to include matches, only the matches whose length exceeds this       * value will be returned. (For instance, if you want to ignore single       * character index returns, set to 2).       */      
            minMatchCharLength: 1,      /**       * List of properties that will be searched. This supports nested properties,       * weighted search, searching in arrays of strings and objects.       */      
            keys: ['value']    
        }
        console.log(props)
        this.fuse = new Fuse(data, options)
    }

    componentDidMount() {
        const { value } = this.props;
        const { data } = this.props;const options = {      /**       * At what point does the match algorithm give up. A threshold of 0.0       * requires a perfect match (of both letters and location), a threshold       * of 1.0 would match anything.       */      
            threshold: 0.05,      /**       * Determines approximately where in the text is the pattern expected to be found.       */      
            location: 0,      /**       * Determines how close the match must be to the fuzzy location       * (specified by location). An exact letter match which is distance       * characters away from the fuzzy location would score as a complete       * mismatch. A distance of 0 requires the match be at the exact       * location specified, a distance of 1000 would require a perfect       * match to be within 800 characters of the location to be found       * using a threshold of 0.8.       */      
            distance: 100,      /**       * When set to include matches, only the matches whose length exceeds this       * value will be returned. (For instance, if you want to ignore single       * character index returns, set to 2).       */      
            minMatchCharLength: 1,      /**       * List of properties that will be searched. This supports nested properties,       * weighted search, searching in arrays of strings and objects.       */      
            keys: ['value']    
        }
        console.log(this.props)
        this.fuse = new Fuse(data, options)
        const matchedRecords = this.fuse.search(value)
        this.setState({      
            value: value.trim(),      
            matchedRecords,      /**       * Control the showing and hiding of the dropdown when there is any value       * in the input box. But, close the dropdown once any dropdown item is       * clicked.       */      
            showDropdown: !!value.trim()    })  
        this.setState({ value: value })
    }

    handleInputChange = e => {
        const { value } = e.target;
        let matchedRecords = this.fuse.search(value);
        let show = true;
        if (value === '') show = false;
        console.log(this.props)
        console.log(this.fuse.search(value))
        console.log(this.state)
        this.setState({ value: value.trim(), matchedRecords, showDropdown: show });
    }

    handleDropdownItemClick = record => {
        if (this.state.saved_values.length > this.props.max) return
        const { value } = record.item
        this.setState({      
            saved_values: this.state.saved_values.concat(record.item),
            value,      /**       * Hide the dropdown once any dropdown item is clicked       */      
            showDropdown: false    
        })  }

    handleChosenItemClick = record => {
        this.setState({
            saved_values: this.state.saved_values.filter(i => i.key != record.key)
        })
    }
    
    chosenNode = () => {
        const { saved_values } = this.state;
        return (<div role="menu">                
        {saved_values.map(record => { 
            return (
                <div className="dropdown-item" key={record.key} onClick={() => this.handleChosenItemClick(record)}> 
                    {record.value}              
                </div>) })}           
        </div>)
            
        
    }

    inputNode = () => {
        const { placeholder } = this.props;
        const { value } = this.state;
        return (
            <input
                placeholder={placeholder}
                value={value}
                onChange={this.handleInputChange}
                data-toggle="dropdown" type="search" className="form-control" autoFocus="autofocus" autoComplete="off" aria-haspopup="true"
            />
        )
    }

    dropdownNode = () => {
        const { matchedRecords, showDropdown } = this.state
        if (!showDropdown) return false
        return (<div className="dropdown-menu show" role="menu">                
                {matchedRecords.slice(0,5).map(record => { 
                    console.log(record)
                    return (
                        <div className="dropdown-item"
                            key={record.item.key} 
                            onClick={() => this.handleDropdownItemClick(record)}             
                        > 
                            {record.item.value.toString()}              
                        </div>) })}           
                </div>)
    }


render() {
    return (
        <div className="dropdown">
            {this.chosenNode()}
            {this.inputNode()}
            {this.dropdownNode()}
        </div>
    )
}
}




