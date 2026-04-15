# PRIA Landing Preview

연결 거부(`ERR_CONNECTION_REFUSED`)가 뜨면, 서버가 안 떠 있거나 `127.0.0.1` 바인딩 문제일 가능성이 큽니다.
이 스크립트는 기본값으로 `0.0.0.0`에 바인딩해서 접속 문제를 줄였습니다.

## 실행

```bash
bash pria-landing/preview.sh
```

실행 후 터미널에 아래 두 주소가 출력됩니다.

- local: `http://127.0.0.1:4173/pria-landing/`
- network: `http://<내IP>:4173/pria-landing/`

## 옵션

```bash
# 포트만 변경
bash pria-landing/preview.sh 8080

# 포트 + 바인딩 호스트 지정
bash pria-landing/preview.sh 8080 0.0.0.0
```

서버 종료는 `Ctrl + C` 입니다.
