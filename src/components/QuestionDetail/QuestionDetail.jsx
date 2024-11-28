import { useParams } from "react-router-dom";
import {
  Card,
  CardContent,
  Typography,
  Chip,
  Stack,
  Box,
  IconButton,
} from "@mui/material";
import { AiOutlineLike, AiOutlineDislike } from "react-icons/ai";
import AddAnswer from "../AddAnswer/AddAnswer";
import { HelpOutline } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { fetchQuestionDetail } from "../../redux/questionDetailSlice";
import { useEffect } from "react";
import Answer from "../Answer/Answer";

function QuestionDetail() {
  const { id } = useParams();
  const dispatch = useDispatch();

  const { questionDetail, status, error } = useSelector(
    (state) => state.questionDetail
  );
  useEffect(() => {
    dispatch(fetchQuestionDetail(id));
  }, [id]);

  // Yükleme veya hata durumlarını kontrol et
  if (status === "loading") {
    return <Typography>Loading...</Typography>;
  }

  if (status === "failed") {
    return <Typography>Error: {error}</Typography>;
  }

  return (
    <Box sx={{ padding: 0, paddingLeft: 2 }}>
      {/* Soru Başlığı */}
      <Card
        sx={{ marginBottom: 1, padding: 0 }}
        style={{ width: "65rem", height: "15rem" }}
      >
        <CardContent>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <HelpOutline sx={{ color: "#1976d2", fontSize: 50 }} />{" "}
            <Typography
              variant="h4"
              sx={{
                fontWeight: "bold",
                color: "#333",
                textShadow: "1px 1px 2px rgba(0, 0, 0, 0.1)",
              }}
            >
              {questionDetail.title}
            </Typography>
          </Box>
          <Typography
            variant="body1"
            color="text.secondary"
            sx={{ marginBottom: 2 }}
          >
            {questionDetail.body}
          </Typography>

          {/* Etiketler */}
          <Stack direction="row" spacing={1}>
            {questionDetail.tag_names?.map((tag, index) => (
              <Chip
                key={index}
                label={tag}
                color="primary"
                variant="outlined"
              />
            ))}
          </Stack>
          <div>
            <IconButton color="primary">
              <AiOutlineLike />
            </IconButton>
            <Typography component="span" sx={{ marginRight: 2 }}>
              {questionDetail.like_count}
            </Typography>
            <IconButton color="error">
              <AiOutlineDislike />
            </IconButton>
            <Typography component="span">
              {questionDetail.dislike_count}
            </Typography>
          </div>
        </CardContent>
      </Card>

      {/* Cevaplar */}
      <Typography variant="h5" sx={{ marginBottom: 3 }}>
        Answers
      </Typography>
      <Stack spacing={3}>
        {questionDetail.comments?.map((answer) => (
          <Answer key={answer.id} answer={answer} questionId={id} />
        ))}
      </Stack>

      {/* Yeni Cevap Ekle */}
      <Box sx={{ marginTop: 4 }}>
        <AddAnswer questionId={id} />
      </Box>
    </Box>
  );
}

export default QuestionDetail;
