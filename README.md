<p align="center">
	<img src=".github/Mockup.png" alt="Project mockup"/>
  <h1 align="center">Rodizio2o</h1>
  <p align="center">Open-source application to check the next water restriction in an easier way.</p>
</p>

---

> ⚠️ This project no longer is maintained and is not working due to the normalization of water.

---

<p align="center">
 <a href="#about">About</a> • 
 <a href="#idea">Idea / Solution</a> • 
 <a href="#nolonger">Why no longer works?</a> • 
 <a href="#features">Features</a> • 
 <a href="#built">Technologies</a> •
 <a href="#started">Getting started</a> 
</p>

### 🧐 About <a name="about"></a>
#### 💡 Idea / Solution <a name="idea"></a>
The idea behind this project was to make a website to be easily accessed by everyone to see the following restriction on water. The official website provided by the government was buggy and was not mobile-friendly. And it was really difficult to check fast because of the redundancy of inserting the address every time you wanted to see it.

#### ⛓️ Why no longer works? <a name="nolonger"></a>
The reason behing of why this project no longer works is because, after the official release, it was announced on the same day by the government that the restrictions were over by the following week.

### 🚀 Features <a name="features"></a>

- Consuming Rodizio API to check the next water restriction.
- Prediction system when the API does not provide a date.
- Saving data locally, making faster to use and see the important data.
- PWA for desktop / mobile web applications.

### ⛏️ Built with <a name="built"></a>

<p id="technology" align="left">
  <img alt="Typescript" src="https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white"/>
  <img alt="React" src="https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB"/>
  <img alt="TailwindCSS" src="https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white"/>
  <img alt="Turborepo" src="https://img.shields.io/badge/Turborepo-fff?style=for-the-badge&logo=data:image/png;base64,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&logoColor=white"/>
	<img alt="Jest" src="https://img.shields.io/badge/Jest-C21325?style=for-the-badge&logo=jest&logoColor=white"/>
  
</p>

### 🏁 Getting started <a name="started"></a>

### Installing

1. First, clone or download this repository

```bash
git clone https://github.com/KeysHD/rodizio2o.git
```

2. Install all the dependencies

```bash
yarn install
```

3. Run the project

```bash
yarn dev
```

4. Navigate to `https://localhost:3000` to view the website
5. Send requests to `https://localhost:3001` to get API data

### 📘 Documentation API <a name="api"></a>

#### GET restriction water data

```http
  GET /api/rodizio/${cep}/${number}
```

```http
  GET /api/rodizio?cep=${cep}&num=${number}
```

| Parameter | Type     | Description                                                                                                                       |
| :-------- | :------- | :-------------------------------------------------------------------------------------------------------------------------------- |
| `cep`     | `string` | **Required**. [CEP](https://en.wikipedia.org/wiki/C%C3%B3digo_de_Endere%C3%A7amento_Postal) of the place where you want to search |
| `number`  | `string` | **Required**. Number of the place where you want to search                                                                        |

---

```http
  GET /api/rodizio?address=${street}
```

| Parameter | Type     | Description                                                 |
| :-------- | :------- | :---------------------------------------------------------- |
| `street`  | `string` | **Required**. Address of the place where you want to search |

### 📖 License

[MIT License - Copyright (c) 2022 Kevin](https://choosealicense.com/licenses/mit/)
