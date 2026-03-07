import React from 'react'
import { PlusCircle, MinusCircle, Lock } from 'lucide-react';

function cyclistRow({rider, onAction, actionType}) {
    const isAdding = actionType === 'add';
    const isRemoving = actionType === 'remove';
    const isDisabled = actionType === 'disabled';

    let buttonIcon;
    let buttonMessage;
    let buttonColor;
    let buttonDisabled = false;

    if (isAdding) {
        buttonIcon = <PlusCircle size={26} color={'#f2f224ff'}/>;
        buttonMessage = 'Add Rider';
        buttonColor = 'bg-green-700 hover:bg-green-500 hover:animate-bounce border-yellow-200 text-yellow-200 border-2 rounded-lg';
    } else if (isRemoving) {
        buttonIcon = <MinusCircle size={26} color={'white'}/>;
        buttonMessage = 'Remove Rider';
        buttonColor = 'bg-red-700 hover:bg-red-500 hover:animate-bounce border-sky-600 text-white border-2 rounded-lg';
    } else if (isDisabled) {
        buttonIcon = <Lock size={26} color={'#0096FF'}/>;
        buttonMessage = 'Team Full';
        buttonColor = 'bg-slate-500 text-blue-400';
    };

    

  return (
    
        <tr>
            <td>
                {rider.name} - {rider.country}
            </td>
            <td>{rider.team}</td> 
            <td>${rider.cost}</td>
            <td>
                <button 
                    onClick={() => onAction(rider.id)}
                    className ={`flex ${buttonColor}`}
                    disabled = {buttonDisabled}
                    >
                        {buttonIcon}{buttonMessage}
                </button>
            </td>   
        </tr>
    
  )
}

export default cyclistRow