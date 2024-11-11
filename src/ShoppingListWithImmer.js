import React from 'react';
import {useImmer} from "use-immer";
import {v4 as uuidv4} from 'uuid';

function ShoppingListWithImmer(props) {
    const [shoppingList, updateShoppingList] = useImmer([{
        id: uuidv4(),
        name: "",
        quality: "",
        details: {
            category: "",
            notes: ""
        }
    }])

    function addItem(id) {
        updateShoppingList(item => ([
            ...item,
            {
                id: uuidv4(),
                name: "",
                quality: "",
                details: { category: "", notes: "" }
            }
        ]))
    }

    function updateItem(id, field, value) {
        let item = shoppingList.find(item => item.id === id);
        const index = shoppingList.findIndex(item => item.id === id);

        if (field.includes(".")) {
            console.log("Nested")
            console.log([
                ...shoppingList.slice(0, index),
                { ...item, [field.split(".")[0]] :
                        {
                            ...item[field.split(".")[0]],
                            [field.split(".")[1]]: value
                        }
                },
                ...shoppingList.slice(index + 1)
            ])
            updateShoppingList([
                ...shoppingList.slice(0, index),
                    { ...item, [field.split(".")[0]] :
                        {
                            ...item[field.split(".")[0]],
                            [field.split(".")[1]]: value
                        }
                    },
                ...shoppingList.slice(index + 1)
            ]);
        } else {
            console.log("Not nested", )
            updateShoppingList([
                ...shoppingList.slice(0, index), { ...item, [field]: value }, ...shoppingList.slice(index + 1)
            ]);
        }

    }

    function removeItem(id) {
        const index = shoppingList.findIndex(item => item.id === id);

        if (index !== -1) {
            // Create a new array without mutating the original
            const newList = [...shoppingList.slice(0, index), ...shoppingList.slice(index + 1)];
            updateShoppingList(newList);
        }
    }


    return (
        <>
            <button onClick={addItem}>Add Item</button>
            {shoppingList.map((item) => (
                <div key={item.id} style={{border: '1px solid black', margin: '2rem', padding: '10px'}}>
                    <input
                        type="text"
                        placeholder="Item Name"
                        value={item.name}
                        onChange={(e) => updateItem(item.id, "name", e.target.value)}
                    />
                    <input
                        type="text"
                        placeholder="Quality"
                        value={item.quality}
                        onChange={(e) => updateItem(item.id, "quality", e.target.value)}
                    />
                    <input
                        type="text"
                        placeholder="Category"
                        value={item.details.category}
                        onChange={(e) => updateItem(item.id, "details.category", e.target.value)}
                    />
                    <input
                        type="text"
                        placeholder="Notes"
                        value={item.details.notes}
                        onChange={(e) => updateItem(item.id, "details.notes", e.target.value)}
                    />
                    <button onClick={() => removeItem(item.id)}>Remove</button>
                </div>
            ))}
        </>
    );
}

export default ShoppingListWithImmer;