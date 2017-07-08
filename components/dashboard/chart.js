import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts'

export default ({ name, data }) => (
    <div>
        <h2>{name}</h2>
        <BarChart width={600} height={300} data={data}>
            <XAxis dataKey="name"/>
            <YAxis />
            <CartesianGrid strokeDasharray="3 3" />
            <Tooltip formatter={(value) => `${value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}`} />
            <Legend />
            <Bar name="Previsto" dataKey="tp" fill="#82ca9d" />
            <Bar name="Real" dataKey="tr" fill="#8884d8" />
        </BarChart>
    </div>
)
