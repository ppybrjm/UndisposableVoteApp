namespace VoterAPI.Models {
    public class Voter {
        public int id { get; set; }

        public bool voteOpen { get; set; }

        public int aVotes {get; set; }

        public int bVotes {get; set; }
    }
}