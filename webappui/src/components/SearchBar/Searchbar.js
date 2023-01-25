import React ,{useState} from 'react';
import './Searchbar.css';
import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from '@mui/icons-material/Close';
import { useHistory } from "react-router-dom";

function Searchbar({placeholder,data}) {

    const [FilteredData, setFilteredData] = useState([]);
    const [WordEntered, setWordEntered] = useState("");
    const history = useHistory()

    const handleFilter = (e) => {
        const searchWord = e.target.value;
        setWordEntered(searchWord);
        const newFilter = data.filter((value)=> {
            return value.toLowerCase().includes(searchWord.toLowerCase());
        });
        if (searchWord==="") {
            setFilteredData([]);
        } else {
        setFilteredData(newFilter);
        }
    };
    const clearInput =() => {
        setFilteredData([]);
        setWordEntered("");
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            history.push("/search_menu/"+ e.target.value)
            window.location.reload();
    }};

    
    return (
        <div className="search">
            <div className="searchInputs">
                <input type="text" placeholder={placeholder} value={WordEntered} onChange={handleFilter} onKeyDown={handleKeyDown}/>
                <div className="searchIcon">
                    {FilteredData.length ===0 ? <SearchIcon/> : <CloseIcon id="clearBtn" onClick={clearInput}/>}
                </div>
            </div>
            {FilteredData.length !=0 && (
            <div className="dataResult">
                {FilteredData.slice(0, 15).map((value)=> {
                    return (
                    <a className="dataItem" href={"/datasets/"+value + "_dsn_175882445073278234578"} target="_blank">
                        <p>{value}</p>
                    </a>
                    );
                })}
            </div>
            )}
        </div>
    );
}

export default Searchbar;