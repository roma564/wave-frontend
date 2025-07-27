import { TextField } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search';

export default function Search() {
  return (
    <div className="search flex row flex items-center">
        <TextField className="bg-white rounded-md" id="filled-basic" label={ <SearchIcon/>} variant="filled" />
    </div>
  )
}
