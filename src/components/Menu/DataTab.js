import React, { useEffect, useState } from "react";
import { getTranscripts } from "../../API";
import { AudioPlayer } from "../Transcription";
import { DataTable} from "primereact/datatable";
import { Column } from "primereact/column";
import { Paginator } from "primereact/paginator";
import { classNames } from "primereact/utils";
// import "primereact/resources/themes/lara-light-indigo.css"
import "primereact/resources/primereact.min.css"

export const transcriptData =[
            {
              Id: 1,
              Audio: "https://actions.google.com/sounds/v1/alarms/digital_watch_alarm_long.ogg",
              Transcript: "The Impact of Technology on Modern Education",
              Length: "3:45",
              Body: "Something about that didn't work"
            },
            {
              Id: 2,
              Audio: "https://actions.google.com/sounds/v1/animals/animal_bark_and_growl.ogg",
              Transcript: "Climate Change and Its Effects on Wildlife",
              Length: "5:12",
              Body: "The last one was too long"
            },
            {
              Id: 3,
              Audio: "https://www.example.com/audio/test-audio-3.mp3",
              Transcript: "The Future of Artificial Intelligence",
              Length: "4:30",
              Body: "Let's just try out a few this time."
            },
            {
                Id: 4,
                Audio: "https://www.example.com/audio/test-audio-3.mp3",
                Transcript: "The Future of Artificial Intelligence",
                Length: "4:30",
                Body: "Let's just try out a few this time."
              },
              {
                Id: 5,
                Audio: "https://www.example.com/audio/test-audio-3.mp3",
                Transcript: "The Future of Artificial Intelligence",
                Length: "4:30",
                Body: "Let's just try out a few this time."
              },
              {
                Id: 6,
                Audio: "https://www.example.com/audio/test-audio-3.mp3",
                Transcript: "The Future of Artificial Intelligence",
                Length: "4:30",
                Body: "Let's just try out a few this time."
              },
              {
                Id: 3,
                Audio: "https://www.example.com/audio/test-audio-3.mp3",
                Transcript: "The Future of Artificial Intelligence",
                Length: "4:30",
                Body: "Let's just try out a few this time."
              }
        
        ]

const Data = () => {
   // const [transcriptData, setTranscriptData] = useState({})
   const [transcriptBody, setTranscriptBody] = useState("")

        const headers = [
            {title:"Id", prop: 'id'},
            {title:"Transcript", prop: 'transcript'},
            {title:"Length", prop: 'length'},
            {title:"Audio", prop: 'audio'},
        ]

        

        
            const body = transcriptData.map(({ Id, Audio, Transcript, Length }) => ({
                id: Id,
                transcript: Transcript,
                length: Length,
                audio: <AudioPlayer audioSrc={Audio} />
              }));

            function PageNumbers(){

                const [first, setFirst] = useState(0);
                const [rows, setRows] = useState(10);
            
                const onPageChange = (event) => {
                    setFirst(event.first);
                    setRows(event.rows);
                };
            
                return(
                    <div className="card">
                        <Paginator first={first} rows={rows} totalRecords={120} rowsPerPageOptions={[10, 20, 30]} onPageChange={onPageChange} />
                    </div>
                )
            }

            function TableComponent(){
                return(
                    <DataTable value={body} showGridlines stripedRows paginator={PageNumbers} rows={5} rowsPerPageOptions={[5, 10, 25, 50]} tableStyle={{ minWidth: '50rem' }} paginatorTemplate="RowsPerPageDropdown FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink"
                    currentPageReportTemplate="{first} to {last} of {totalRecords}" >

                        <Column  field="id" header="Id" style={{ width: '25%' }}></Column>
                        <Column  field="transcript" header="Transcript" style={{ width: '25%' }}></Column>
                        <Column  field="length" header="Length" style={{ width: '25%' }}></Column>
                        <Column  field="audio" header="Audio" style={{ width: '25%' }}></Column>
                    </DataTable>
                )
            }
          

 return (<div className="p-5 items-stretch ">
    
    <TableComponent />
</div>)

}

export default Data