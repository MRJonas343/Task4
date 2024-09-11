export interface Row {
	id: string
	name: string
	email: string
	"last-login": string
	"registration-time": string
	status: string
	isSelected?: boolean
}

export const rowsData = [
	{
		id: "18",
		name: "Tony Reichert",
		email: "tony@example.com",
		"last-login": "2022-01-01",
		"registration-time": "2021-12-31",
		status: "Active",
	},
	{
		id: "27",
		name: "Zoey Lang",
		email: "zoey@example.com",
		"last-login": "2022-01-02",
		"registration-time": "2022-01-01",
		status: "Bloocked",
	},
	{
		id: "43",
		name: "Jane Fisher",
		email: "jane@example.com",
		"last-login": "2022-01-03",
		"registration-time": "2022-01-02",
		status: "Active",
	},
	{
		id: "4",
		name: "William Howard",
		email: "william@example.com",
		"last-login": "2022-01-04",
		"registration-time": "2022-01-03",
		status: "Blocked",
	},
]
