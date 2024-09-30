import React from "react";

function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var backgroundColor = '#';
    for (var i = 0; i < 6; i++) {
        backgroundColor += letters[Math.floor(Math.random() * 16)];
    }
    return backgroundColor;
}

const Color = (WrappedComponent) => {
    const colorRandom = getRandomColor();
    return (props) => (
        <>
            <div style={{ backgroundColor: colorRandom }}>
                <WrappedComponent {...props} />
            </div>
        </>
    );
};

export default Color;
