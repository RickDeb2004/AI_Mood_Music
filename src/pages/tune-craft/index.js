import React, { useState } from 'react';
import styled from 'styled-components';


const songData = [
    {
        songName: "Tum Hi Ho",
        artist: "Arijit Singh",
        language: "Hindi",
        prominentNotes: ["C", "D", "E", "G"],
        prominentChords: ["Cmaj", "Gmaj", "Fmaj"],
        genre: "Bollywood Ballad"
    },
    {
        songName: "Shape of You",
        artist: "Ed Sheeran",
        language: "English",
        prominentNotes: ["C", "E", "G", "A"],
        prominentChords: ["Cmaj", "Amin", "Fmaj"],
        genre: "Pop"
    },
    
];

// TuneCrafter component
const TuneCrafter = () => {
    const [selectedNote, setSelectedNote] = useState('');
    const [selectedChord, setSelectedChord] = useState('');
    const [recommendedSong, setRecommendedSong] = useState(null);

    // Handle note and chord selection
    const handleNoteChange = (event) => {
        setSelectedNote(event.target.value);
        findRecommendedSong(event.target.value, selectedChord);
    };

    const handleChordChange = (event) => {
        setSelectedChord(event.target.value);
        findRecommendedSong(selectedNote, event.target.value);
    };

    // Find a song that matches both the selected note and chord
    const findRecommendedSong = (note, chord) => {
        if (note && chord) {
            const foundSong = songData.find(
                song => song.prominentNotes.includes(note) && song.prominentChords.includes(chord)
            );
            setRecommendedSong(foundSong || null);
        }
    };

    return (
        <Container>
            <Title>Tune Crafter</Title>
            <Instructions>Select Prominent Note and Chord to get a song recommendation!</Instructions>

            <DropdownWrapper>
                <Label>Prominent Notes:</Label>
                <Dropdown value={selectedNote} onChange={handleNoteChange}>
                    <option value="">Select a note</option>
                    <option value="C">C</option>
                    <option value="D">D</option>
                    <option value="E">E</option>
                    <option value="G">G</option>
                    <option value="A">A</option>
                    {/* Add more options as needed */}
                </Dropdown>

                <Label>Prominent Chords:</Label>
                <Dropdown value={selectedChord} onChange={handleChordChange}>
                    <option value="">Select a chord</option>
                    <option value="Cmaj">Cmaj</option>
                    <option value="Gmaj">Gmaj</option>
                    <option value="Fmaj">Fmaj</option>
                    <option value="Amin">Amin</option>
                    {/* Add more options as needed */}
                </Dropdown>
            </DropdownWrapper>

            {recommendedSong ? (
                <Recommendation>
                    <SongTitle>{recommendedSong.songName}</SongTitle>
                    <SongDetails>Artist: {recommendedSong.artist}</SongDetails>
                    <SongDetails>Language: {recommendedSong.language}</SongDetails>
                    <SongDetails>Genre: {recommendedSong.genre}</SongDetails>
                </Recommendation>
            ) : (
                <NoRecommendation>No song recommendation yet.</NoRecommendation>
            )}
        </Container>
    );
};

// Styled Components
const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 50px;
`;

const Title = styled.h1`
    font-size: 40px;
    color: #333;
    margin-bottom: 20px;
`;

const Instructions = styled.p`
    font-size: 18px;
    color: #666;
    margin-bottom: 30px;
`;

const DropdownWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: 40px;
`;

const Label = styled.label`
    font-size: 16px;
    margin-bottom: 10px;
`;

const Dropdown = styled.select`
    font-size: 16px;
    padding: 10px;
    margin-bottom: 20px;
    width: 200px;
`;

const Recommendation = styled.div`
    margin-top: 30px;
    text-align: center;
`;

const SongTitle = styled.h2`
    font-size: 30px;
    color: #007BFF;
`;

const SongDetails = styled.p`
    font-size: 18px;
    color: #555;
`;

const NoRecommendation = styled.p`
    font-size: 20px;
    color: #888;
`;

export default TuneCrafter;
