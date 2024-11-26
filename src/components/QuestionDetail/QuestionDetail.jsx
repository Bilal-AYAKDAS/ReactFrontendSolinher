import { useParams } from "react-router-dom";
import { question } from "../../data/QuestionApiById";
import {
  Card,
  CardContent,
  Typography,
  Chip,
  Stack,
  Divider,
  Box,
  IconButton,
} from "@mui/material";
import { AiOutlineLike, AiOutlineDislike } from "react-icons/ai";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleQuestion,} from "@fortawesome/free-solid-svg-icons";
import AddAnswer from "../AddAnswer/AddAnswer";
import { QuestionMark } from "@mui/icons-material";


import { useDispatch, useSelector } from "react-redux";
import { fetchQuestionDetail } from "../../redux/questionDetailSlice";
import { useEffect } from "react";
import { format } from "date-fns"; // date-fns kullanımı

function QuestionDetail() {
  const { id } = useParams();
  const dispatch = useDispatch();

  const onLikeClick =async(id) =>{
    console.log(id)
  }
  const onDislikeClick = async(id) =>{
    console.log(id)
  }
  const onLikeQuestion =async(id) =>{
    console.log(id)
  }
  const onDislikeQuestion = async (id) =>{
    console.log(id)

  }

  const { questionDetail, status, error } = useSelector(
    (state) => state.questionDetail
  );

  useEffect(() => {
    // Soru detaylarını API'den çek
    dispatch(fetchQuestionDetail(id));
  }, [dispatch, id]);


  console.log(questionDetail)

   // Yükleme veya hata durumlarını kontrol et
   if (status === "loading") {
    return <Typography>Loading...</Typography>;
  }

  if (status === "failed") {
    return <Typography>Error: {error}</Typography>;
  }

  return (
    <Box sx={{ padding: 0 ,paddingLeft:2 }}>
      {/* Soru Başlığı */}
      <Card sx={{ marginBottom: 1, padding: 0 }} style={{ width: "65rem", height: "15rem" }}>
        <CardContent>
        <Box display="flex" alignItems="center" gap={2}>
          <Box sx={{background: "linear-gradient(90deg, #3f51b5, #2196f3)", // Modern gradient renk
                    color: "#ffffff", // Metin rengi beyaz
                    padding: 0.5,
                    borderRadius: 2,
                    display: "flex",
                    alignItems: "center",
                    gap: 2,
                    boxShadow: 3, // Hafif gölge
                  }}>
                <QuestionMark sx={{ color: "#61e8f8", fontSize: 40 }} />

          </Box>
          <Typography variant="h4" gutterBottom>
            {questionDetail.title}
          </Typography>
        </Box>
          <Typography variant="body1" color="text.secondary" sx={{ marginBottom: 2 }}>
            {questionDetail.body}
          </Typography>

          {/* Etiketler */}
          <Stack direction="row" spacing={1}>
            {questionDetail.tag_names?.map((tag, index) => (
              <Chip key={index} label={tag} color="primary" variant="outlined" />
            ))}
          </Stack>
          <div>
              <IconButton color="primary" onClick={() => onLikeQuestion(questionDetail.id)}>
                <AiOutlineLike />
              </IconButton>
              <Typography component="span" sx={{ marginRight: 2 }}>
                {questionDetail.like_count}
              </Typography>
              <IconButton color="error" onClick={() => onDislikeQuestion(questionDetail.id)}>
                <AiOutlineDislike />
              </IconButton>
              <Typography component="span">{questionDetail.dislike_count}</Typography>
            </div>
        </CardContent>
      </Card>

      {/* Cevaplar */}
      <Typography variant="h5" sx={{ marginBottom: 3 }}>
        Answers
      </Typography>
      <Stack spacing={3}>
        {questionDetail.comments?.map((answer, index) => (
          <Card key={answer.answerId} sx={{ padding: 2 }} style={{ width: "65rem", height: "15rem" }}>
            <CardContent>
              <Stack direction="row" justifyContent="space-between" alignItems="center">
                <Typography variant="h6">
                  Answer #{index + 1}
                </Typography>
                
              </Stack>
              <Divider sx={{ marginY: 2 }} />
              <Typography variant="body1">
                <strong>Answer Text:</strong> {answer.body}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                <strong>Answered By:</strong> {answer.user}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                <strong>Date:</strong> {format(new Date(answer.created_at), "PPpp")}
              </Typography>

              {/* Like ve Dislike Bilgileri */}
              <div>
              <IconButton color="primary" onClick={() => onLikeClick(answer.id)}>
                <AiOutlineLike />
              </IconButton>
              <Typography component="span" sx={{ marginRight: 2 }}>
                {answer.like_count}
              </Typography>
              <IconButton color="error" onClick={() => onDislikeClick(answer.id)}>
                <AiOutlineDislike />
              </IconButton>
              <Typography component="span">{answer.dislike_count}</Typography>
            </div>
            </CardContent>
          </Card>
        ))}
      </Stack>

      {/* Yeni Cevap Ekle */}
      <Box sx={{ marginTop: 4 }}>
        <AddAnswer question={id} />
      </Box>

    </Box>
  );
}

export default QuestionDetail;
