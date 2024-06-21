import React from "react";
import Data from "./DataTab";

const TableDiv = () => {
return (<div>
    <div className="text-center text-xl font-medium antialiased py-3">Recent Files</div>
    <div className="p-4">
        <Data />
    </div>
</div>)

}

export default TableDiv