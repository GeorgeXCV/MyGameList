import {
    Textarea,
    FormControl,
    FormLabel,
    FormErrorMessage,
    Button,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
  } from '@chakra-ui/react';
  import { useState } from 'react';
  import PlatformButtons from './PlatformButtons';
  import { reviewGame } from '../services/profile';
  import * as yup from 'yup';
  import { useForm } from 'react-hook-form';
  import { yupResolver } from '@hookform/resolvers/yup';
  import { Rating } from 'react-simple-star-rating'



const ReviewModal = ({ isOpen, onClose, game, user, rating }) => {
    const schema = yup.object().shape({
        platform: yup.string().required("Platform is required"),
        review: yup.string().required('Review is required.').min(30, 'Reviews must be at least 30 characters long.').max(8000, "Reviews cannot exceed 8000 characters."),
        rating: yup.number().min(1).max(10).required('Rating is required.')
      });
      
    type ReviewFormInputs = {
        platform: string,
        review: string;
        rating: Number;
    };

    const { register, handleSubmit, formState:{ errors }  } = useForm<ReviewFormInputs>({
        mode: 'onBlur',
        resolver: yupResolver(schema),
    });


    const [loading, isLoading] = useState(false)
    const [internalRating, setInternalRating] = useState(rating)
    const [platform, setPlatform] = useState(null)

    const handleRating = (rate: number) => {
        setInternalRating(rate)
    }

    const submitReview = async (reviewDetails: ReviewFormInputs) => {
            isLoading(true)
            await reviewGame(game.id, user.id, user.username, reviewDetails.platform, reviewDetails.review, reviewDetails.rating)
            isLoading(false)
            onClose()
    }

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
        >
        <ModalOverlay />
            <ModalContent>
                <ModalHeader>Submit Review</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                <FormControl
                   isInvalid={!platform}
                   errortext={errors?.platform?.message}
                  >
                <FormLabel>Platform</FormLabel>
                <PlatformButtons platforms={game.platforms} setPlatform={setPlatform} defaultPlatform={null} {...register('platform', {value: platform})}/> 
                <FormErrorMessage>{errors?.platform?.message}</FormErrorMessage>
                </FormControl>
                <FormControl
                   isInvalid={!!errors?.review?.message}
                   errortext={errors?.review?.message}
                   mt={5}
                  >
                <FormLabel>Review</FormLabel>
                <Textarea type="review" name='review' placeholder='Your review...' {...register('review')}/>
                <FormErrorMessage>{errors?.review?.message}</FormErrorMessage>
                  </FormControl>
                  <FormControl 
                    isInvalid={!internalRating}
                    errortext={(errors.rating as any)?.message}
                    mt={6}
                  >
                   <FormLabel>Rating</FormLabel>
                   <Rating className="rating" stars={10} onClick={handleRating} ratingValue={internalRating} {...register('rating', {value: internalRating})} />
                   <FormErrorMessage>{(errors.rating as any)?.message}</FormErrorMessage>
                   </FormControl>
                </ModalBody>
                <ModalFooter>
                    <Button 
                        type="submit" 
                        colorScheme="green" 
                        width="full" 
                        mr={3} 
                        isLoading={loading} 
                        loadingText={"Submitting"}
                        onClick={handleSubmit(submitReview)}
                        disabled={!!errors.review || !internalRating || !platform}
                        >Submit</Button>
                    <Button colorScheme="red" onClick={onClose}>Cancel</Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    )
}

export default ReviewModal;