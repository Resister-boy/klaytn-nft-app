# KlayKlay

## 아이디어 설명
- 자신이 작성한 글을 nft화 하여 사고 팔 수 있는 bapp sns를 만들었습니다.

## 기능 설명
- klaytn wallet address로 회원가입을 마친 사용자는 글을 작성할 수 있습니다.
- 글 작성 후 자신이 원하는 포스트를 mint 버튼을 통해 민팅할 수 있습니다.
- 자신이 민팅한 포스트를 sale 버튼을 통해 마켓에 등록할 수 있습니다.
- 자신이 원하는 포스트를 buy 버튼을 통해 마켓에서 구매할 수 있습니다.

## 페이지 설명
### Home / Market
![image](https://user-images.githubusercontent.com/52701529/189628140-f46c17c8-feed-4fdc-ae4d-629d8133ba60.png)

- Home: db에 등록된 포스트들이 모두 출력됩니다.
- Market: market에 등록된 포스트들이 모두 출력됩니다.

### My page
<img width="1440" alt="스크린샷 2022-09-12 오후 6 53 52" src="https://user-images.githubusercontent.com/52701529/189625757-224b1c85-7de6-4878-a4c8-fe17b9834252.png">

- My Posts: user가 작성한 db의 포스트들만 모아 볼 수 있습니다.
- My NFTs: user가 민팅했거나 마켓에서 구매한 nft들을 모아 볼 수 있습니다.

### Post page
<img width="1440" alt="스크린샷 2022-09-12 오후 6 53 59" src="https://user-images.githubusercontent.com/52701529/189626209-f6b1ea1c-3b7a-49a0-aae6-47c906b0a2fb.png">
<img width="1440" alt="스크린샷 2022-09-12 오후 6 54 44" src="https://user-images.githubusercontent.com/52701529/189626583-efa2666a-61d6-4ffb-8225-dc60899d03e5.png">

- 유저가 작성한 포스트의 경우, 아직 민팅이 안 된 포스트라면 mint 버튼이 뜹니다.
- 민팅이 된 nft post이면서 자신이 소유자인 경우 sale, burn 버튼이 뜹니다.
- 마켓에 등록된 nft post인 경우 buy 버튼이 뜹니다.

### Upload page
![image](https://user-images.githubusercontent.com/52701529/189628355-862c2689-871a-4c88-ab90-cf93807f1039.png)

- 포스트의 title, content, image url을 작성한 후 포스트를 업로드할 수 있습니다.
