export const statusToData: { [key: string]: { name: string, color: "red" | "yellow" | "green" | "indigo" | "purple" | "blue" | "dark" } } = {
    'gateclosed': { name: 'Closed', color: 'red' },
    'togate': { name: 'To Gate', color: 'green' },
    'newgate': { name: 'New Gate', color: 'yellow' },
    'boarding': { name: 'Boarding', color: 'yellow' },
}