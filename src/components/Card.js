import React from 'react'

export default function Card({info}) {

    let d = new Date(info.releasedDate * 1000);
    let months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
    let date = d.getDate() + " " + months[d.getMonth()];

    return (
        <>
            <div className="card bk-white">
                <div className="fl-row mg-1">

                    <div className="fl-column">
                        <svg className="arrow" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 46 20"><defs/><path fill="#000" d="M23 0l23 20H0L23 0z"/></svg>
                        <h2 className="votes">{info.totalVoted}</h2>
                        <svg className="arrow" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 46 20"><defs/><path fill="#000" d="M23 20L46 1H0l23 19z"/></svg>
                        <h2 className="card-label clr-grey">Votes</h2>
                    </div>

                    <div>
                        <img className="card-img" src={info.poster} alt=""/>
                    </div>

                    <div className="fl-column">

                        <h2 className="card-title">{info.title}</h2>

                        <div className="fl-row">
                            <h2 className="card-label bold clr-grey">Genre: &nbsp;</h2>
                            <h2 className="card-label"> {info.genre}</h2>
                        </div>

                        <div className="fl-row">
                            <h2 className="card-label bold clr-grey">Director: &nbsp;</h2>
                            <h2 className="card-label">{info.director}</h2>
                        </div>

                        <div className="fl-row al-top">
                            <h2 className="card-label bold clr-grey">Starring: &nbsp;</h2>
                            <h2 className="card-label">{info.stars}</h2>
                        </div>

                        <h2 className="card-label">Mins | {info.language} | {date}</h2>
                    
                        <h2 className="card-label clr-blue">{info.pageViews} views | Voted by { info.totalVoted } people</h2>
                    </div>

                </div>
                <button className="btn bk-blue width-100 mg-0-2">Watch Trailer</button>
            </div>
        </>
    )
}
