"use client"
import React, { useState, useRef,useEffect } from 'react';
import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';
import './Music.module.css'
import axios from 'axios';
import { BASE_URL, APIKEY } from "~/utils/apiConfig";
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';

const MusicPlayer = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);
// console.log("APIKEY ",APIKEY)
  const songs = [
    {
      title: 'Song 1',
      file: '/music/song1.mp3',
    },
    {
      title: 'Song 2',
      file: '/music/song2.mp3',
    },
  ];

  const [currentSongIndex, setCurrentSongIndex] = useState(0);
  const [languages, setLanguages] = useState({})
  const [fileSets, setFileSets] = useState("")
  const [dataByid, setDataById] = useState("")
  const [audioFiles, setAudioFiles] = useState({})
  const [languageId, setLanguageId] = useState("6696")
  const [bookId, setBookId] = useState("MAT")
  const [fileSetId, setFileSetId] = useState("TELDPIN1DA")
  const [audioFileType, setAudioFileType] = useState("audio")
  const [chapterId, setChapterId] = useState(1)
  const [status, setStatus] = useState({
    isPlaying: false
  });
  const [activeTab, setActiveTab] = useState(0);

  const toggleAudio = () =>
  status.isLoaded
    ? status.isPlaying
      ? audioRef.current.pause()
      : audioRef.current.play()
    : console.log("Audio has not loaded yet.");

  const playPauseToggle = () => {
    console.log("is play", isPlaying)
    if (isPlaying) {
      // audioRef.current.pause();
      setStatus({ ...status, isPlaying: false })
    } else {
      // audioRef.current.play();
      setStatus({ ...status, isPlaying: true })
    }
   
  };

  const handleNextSong = () => {
    // const nextIndex = (currentSongIndex + 1) % songs.length;
    // setCurrentSongIndex(nextIndex);
    // setIsPlaying(true);
    console.log(chapterId);
    if(chapterId >= 1){
      setChapterId(chapterId+1)
      fetchFileSet(languageId)
      fetchLanguages()
      fetchDataById(fileSetId,audioFileType)
      fetchAudioFiles(chapterId,bookId,fileSetId,audioFileType)
    }
  };

  const handlePrevSong = () => {
    // const prevIndex = (currentSongIndex - 1 + songs.length) % songs.length;
    // setCurrentSongIndex(prevIndex);
    // setIsPlaying(true);
    if(chapterId>=1)
    {
      setChapterId(chapterId-1)
      fetchFileSet(languageId)
      fetchLanguages()
      fetchDataById(fileSetId,audioFileType)
      fetchAudioFiles(chapterId,bookId,fileSetId,audioFileType)
    }
    else{
      console.log("not previous")
    }
    
  };

  const fetchFileSet = (lng) => {
    axios
      .get(`${BASE_URL}bibles?key=${APIKEY}&language_code=${lng}&v=4`)
      .then((res) => {
        // console.log("res",res?.data);
        setFileSets(res);
      })
      .catch((err) => console.log(err, "err"));
  };

  const fetchLanguages = () => {
    axios
      .get(`${BASE_URL}languages?key=${APIKEY}&v=4&page=3`)
      .then((res) => {
        // console.log("lnguage ",res?.data);
        setLanguages(res?.data);
      })
      .catch((err) => console.log(err, "err"));
  };

  const fetchDataById = (fileset_id, type) => {
    axios
      .get(`${BASE_URL}bibles/filesets/${fileset_id}/books?v=4&key=${APIKEY}&fileset_type=${type}`)
      .then((res) => {
        // console.log("data by id ",res?.data);
        setDataById(res?.data);
      })
      .catch((err) => console.log(err, "err"));
  };

  const fetchAudioFiles = (id,book_id,fileset_id,type) => {
    axios
      .get(`${BASE_URL}bibles/filesets/${fileset_id}?key=${APIKEY}&v=4&book_id=${book_id}&chapter_id=${id}&type=${type}`)
      .then((res) => {
        // console.log("data by id ",res?.data);
        setAudioFiles(res);
      })
      .catch((err) => console.log(err, "err"));
  };

  useEffect(() => {
    fetchFileSet(languageId)
    fetchLanguages()
    fetchDataById(fileSetId,audioFileType)
    fetchAudioFiles(chapterId,bookId,fileSetId,audioFileType)
  }, []);

  const handleCLidkId = (id,book_id) =>{
    // console.log(id)
    fetchAudioFiles(id,book_id,fileSetId,audioFileType)
    setBookId(book_id)
    setChapterId(id)
  } 

  const handleCLickFile = (data) =>{
      // console.log(data)
      fetchDataById(data?.id, data?.type)
      setFileSetId(data?.id)
      setAudioFileType(data?.type)
  }
  const handleCLickFiles = (data) =>{
   
    data?.filesets["dbp-prod"]?.map((item, index) => {
      if(item?.codec == "mp3"){
        console.log(item)
        fetchDataById(item?.id, item?.type)
        setFileSetId(item?.id)
        setAudioFileType(item?.type)
      }

    })
    // fetchDataById(data?.id, item?.type)
    // setFileSetId(data?.id)
    // setAudioFileType(data?.type)
}

  const handleCLickLng = (data) => {
      // console.log("lng id", data)
      setLanguageId(data)
      fetchFileSet(data)
  }

  return (
    
    <div>
      {/* <h2>Music Player</h2> */}
      {/* <audio ref={audioRef} src={songs[currentSongIndex].file}></audio> */}
      {/* <AudioPlayer
        autoPlay="false"
        controls
        volume
        loop
        src={songs[currentSongIndex].file}
        onPlay={e => console.log(e)}
        ref={audioRef}
        // other props here
      /> */}
      <section id="stats">
      <div className='mx-auto'>
        <ul id="menu">
          <li className="parent"><a href="#">Languages</a>
            <ul className="child">
              <li><a  onClick={ ()=>handleCLickLng(6414)}> English</a></li>
              <li><a onClick={ ()=>handleCLickLng(2355)}> Hindi</a></li>
              <li><a   onClick={ ()=>handleCLickLng(6696)}> Telugu </a></li>
              <li><a   onClick={ ()=>handleCLickLng(4100)}> Marathi </a></li>
              <li><a   onClick={ ()=>handleCLickLng(2326)}> Hebrew </a></li>
              <li><a   onClick={ ()=>handleCLickLng(6411)}> Spanish </a></li>
            </ul></li>
          <li className="parent bibles"><a href="#">Bibles</a>
            <ul className="child">
            {fileSets?.data?.data?.map((lng,ndex)=>{
                  return (
                    <>
                    <li className="parent"><a onClick={ ()=>handleCLickFiles(lng)}>  {lng?.name}<span className="expand">»</span></a>
                  
                    {/* {console.log("dd", lng?.filesets["dbp-prod"])} */}
                    
                          <li key={ndex}>
                           <ul className="child">
                           {lng?.filesets["dbp-prod"]?.map((item, index) => 
                        
                            <li>
                              {item?.codec == "mp3"?(
                              <a 
                              type="button"
                              className="inline-block rounded bg-primary px-4 pb-[5px] pt-[6px] text-xs font-medium "
                              onClick={ ()=>handleCLickFile(item)}>{"("+item?.type + ")"}</a>
                              ):""}
                              </li>
                              
                            )}
                            </ul>
                          </li>
                      
                      </li>
                    </>
                  )
                })}
              </ul>
            
            </li>


          <li className="parent chapters"><a href="#">Toys Category</a>
            <ul className="child">
            {dataByid?.data?.map((lng, index)=>{
               const onSelectTab = () => {
                setActiveTab(index);
              };
                return (
              <li
                key={`tab-${index}`}
                className={`flex cursor-pointer items-center ${
                  activeTab === index ? 'text-primary-600 dark:text-primary-200' : ''
                }`}
                tabIndex={0}
                onClick={onSelectTab}
              ><a href="#">
                   {/* Book : {lng?.book_id} <br/>
                   chapters : {lng?.chapters.length}
                      <br/> */}
                   {lng?.name}
                   <div key={`tab-${index}`} className="">
                   {activeTab === index && (
                   <table className=" text-left text-sm font-light" width={"350px"}>
                      <tbody>
                      <tr className="border-b dark:border-neutral-500">
                      {lng?.chapters?.map((item, index) => 
                          <span key={index}>                   
                            <td className="whitespace-nowrap"><button onClick={ ()=>handleCLidkId(item,lng?.book_id)}>{item + " | "}</button></td>
                          </span>
                        )}
                        </tr>
                      </tbody>
                    </table>
                     )}
                    </div>
              </a>
              </li>
              )
            })}
            </ul>
            </li>
        </ul>
        </div>
        </section>
        {/* {dataByid?.data?.map((lng)=>{
                    return (
                      <>
                      Book : {lng?.book_id}
                      <br/>
                      <p>
                      chapters : {lng?.chapters.length}
                      <br/>
                      {lng?.name}
                      <br/>
                      <table className="min-w-full text-left text-sm font-light">
                       <tbody>
                        <tr className="border-b dark:border-neutral-500">
                        {lng?.chapters?.map((item, index) => 
                            <span key={index}>                   
                              <td className="whitespace-nowrap px-6 py-4 font-medium"><button onClick={ ()=>handleCLidkId(item,lng?.book_id)}>{item + " | "}</button></td>
                            </span>
                          )}
                          </tr>
                        </tbody>
                      </table>
                      </p>
                      </>
                    )
                  })} */}

          <div id="stats">
                <div className="mx-auto max-w-6xl px-4 py-4 sm:px-6 md:px-24 md:py-16 lg:px-8 lg:py-20">
                  <div className="row-gap-8 grid grid-cols-2 md:grid-cols-3">
                  <div
                 
                    className="mb-12 text-center md:mb-0 dark:md:border-slate-500"
                  >
                     <button onClick={()=>handlePrevSong()}
                      type="button"
                    
                      data-te-ripple-init
                      data-te-ripple-color="light"
                    
                    >Previous <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke-width="1.5"
                        stroke="currentColor"
                        className="h-8 w-8">
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          d="M11.25 9l-3 3m0 0l3 3m-3-3h7.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg></button>

                    </div>

                    <div
                    
                      className="mx-auto mb-10 text-center md:mb-0 "
                    >
                         {audioFiles?.data?.data?.map((item,index)=>{
                          return (
                            <>
                            {/* {console.log("name", item)} */}

                           
                            <div className="mb-6 flex justify-center">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="3" stroke="currentColor" class="w-6 h-6">
                              <path stroke-linecap="round" stroke-linejoin="round" d="M19.114 5.636a9 9 0 010 12.728M16.463 8.288a5.25 5.25 0 010 7.424M6.75 8.25l4.72-4.72a.75.75 0 011.28.53v15.88a.75.75 0 01-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.507-1.938-1.354A9.01 9.01 0 012.25 12c0-.83.112-1.633.322-2.396C2.806 8.756 3.63 8.25 4.51 8.25H6.75z" />
                            </svg>

                              </div>
                            <p className="text-sm font-medium uppercase tracking-widest text-gray-800 dark:text-slate-400 lg:text-base ">
                                {item?.book_name} <br/>
                               Chapter : {item?.chapter_start}
                            </p>
                            {/* <img src = {item?.thumbnail} width={"100px"} height={"100px"}/> */}
                            <AudioPlayer
                            autoPlay
                            controls
                            volume
                            loop
                            key={`${index}`}
                            src={item?.path}
                            onPause={e => console.log(e)}
                            onPlay={() => setStatus({ ...status, isPlaying: true })}
                            ref={audioRef}
                            // other props here
                          />
                           
                            </>
                          )
                        })}

                    </div>

                    <div
                    
                      className="mb-12 text-center md:mb-0 md:border-r md:last:border-none dark:md:border-slate-500"
                    >
                    <button
                    type="button"                  
                    data-te-ripple-init
                    data-te-ripple-color="light"              
                    onClick={()=>handleNextSong()}>Next  <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke-width="1.5"
                          stroke="currentColor"
                          className="h-8 w-8">
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M12.75 15l3-3m0 0l-3-3m3 3h-7.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg></button>

                    </div>

                  </div>
                </div>
          </div>

      {/* <p>Now Playing: {songs[currentSongIndex].title}</p> */}
      {/* {console.log("file sets ", fileSets?.data)} */}
      
        
    
    </div>
  );
};

export default MusicPlayer;
