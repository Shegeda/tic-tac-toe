import express from "express";
import cors from "cors";
import { StreamChat } from "stream-chat";
import { v4 as uuidv4 } from "uuid";
import bcrypt from "bcrypt";

//nodemod - при змінах на сервері, автомат перезапуск його
//uuid - створює унікалні індефікатори для кожного юзера щоб ми його ідентефікували
//cors - встановлює зв'язок між фронтом і беком
//bcrypt - для хешування паролей щоб їх не можливо було відстежувати
//

const app = express();

app.use(cors());
app.use(express.json());
// Данні беремо з сайту https://getstream.io/ мій ак shasha_96 sheheda лог, ці данні також можна
// записати в окремому файлі "en.env"
const api_key = "27999mm38vxf";
const api_secret =
  "58hmn288nujfrumzwvpfjs8ahu458n2u39jgk9qrkznne4nx4kkacbjurfuefrpa";
// це буде наше підключення користувачів та створення акаунту в середені нашого потоку
const serverClient = StreamChat.getInstance(api_key, api_secret);

// Логіка серверної частини для signup
app.post("/signup", async (req, res) => {
  // відловлюємо помилки
  try {
    const { firstName, lastName, username, password } = req.body;
    const userId = uuidv4();
    const hashedPassword = await bcrypt.hash(password, 10);
    const token = serverClient.createToken(userId);
    //надсилаємо це все на фронт
    res.json({ token, userId, firstName, lastName, username, hashedPassword });
  } catch (error) {
    res.json(error);
  }
});

// Логіка серверної частини для login
app.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;
    // Певний юзер буде отримувати певне імʼя
    const { users } = await serverClient.queryUsers({ name: username });
    // Перевірка, якщо немає співпадіння іменні
    if (users.length === 0) return res.json({ message: "User not found" });
    const token = serverClient.createToken(users[0].id);
    // Порівнюємо хешовані паролі
    const passwordMatch = bcrypt.compare(
      password,
      users[0].hashedPassword
    );

    //надсилаємо це все на фронт, якщо є збіг
    if (passwordMatch) {
      res.json({
        token,
        firstName: users[0].firstName,
        lastName: users[0].lastName,
        username,
        userId: users[0].id,
      });
    }
  } catch (error) {
    res.json(error);
  }
});

// Вводим актуальний айпи див у термінал з реактом
app.listen(3001, "192.168.8.250", () => {
  console.log("Server is running on port 3001");
});
